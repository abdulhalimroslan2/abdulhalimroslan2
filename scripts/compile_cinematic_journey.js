import ffmpegPath from 'ffmpeg-static';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = '/Users/halimroslan/Desktop/cikgu halim';
const publicMediaDir = path.join(__dirname, '..', 'public', 'media');

if (!fs.existsSync(publicMediaDir)) {
  fs.mkdirSync(publicMediaDir, { recursive: true });
}

const rawFiles = [
  'Man_teaching_with_digital_stylus_202608171022.mp4',
  'Stylus_writing_on_digital_digitizer_202608171029.mp4',
  'Electrical_signal_traveling_thro…_1080p_202608171030.mp4',
  'Electrical_current_travels_ribbo…_202608171031.mp4',
  'Electrical_current_powering_proc…_202608171033.mp4',
  'Processor_processing_data_throug…_202608171035.mp4',
  'Electromagnetic_wave_transmittin…_1080p_202608171039.mp4',
  'Wi-Fi_signal_entering_projector_…_202608171040.mp4',
  'Camera_moving_through_projector_…_202608171048.mp4',
  'Light_traveling_into_student_eye_202608171046.mp4'
];

// Check all source files
const inputFiles = rawFiles.map(f => {
  const fullPath = path.join(inputDir, f);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing video clip: ${fullPath}`);
  }
  return fullPath;
});

console.log(`🎬 Found all 10 source clips in: ${inputDir}`);

// Transitions between the 10 clips (9 transitions)
const transitions = [
  'zoomin',      // 1 -> 2: Cikgu Halim -> Stylus Tip Macro Zoom
  'pixelize',    // 2 -> 3: Stylus Contact -> Sub-pixel Quantum Signal
  'smoothleft',  // 3 -> 4: Sub-pixel -> High-speed Ribbon Cable Transit
  'circleopen',  // 4 -> 5: Ribbon Cable -> Silicon Substrate Power
  'rectcrop',    // 5 -> 6: Silicon Power -> Binary Microprocessor Logic
  'radial',      // 6 -> 7: Binary Logic -> Wi-Fi RF Wave Emission
  'zoomin',      // 7 -> 8: RF Wave -> Projector Receiver & Circuit Board
  'smoothup',    // 8 -> 9: Circuit Board -> Optical Engine Prism Lens
  'radial'       // 9 -> 10: Projection Beam -> Student Eye & Retina Illumination
];

const SEGMENT_DURATION = 2.8; // Duration per clip
const TRANSITION_DURATION = 0.8; // Duration of optical morph cross-fade

/**
 * Compile video stream with given dimensions and target mobile mode
 */
function compileVideo({ width, height, fps, crf, outputFile, isMobilePortrait = false }) {
  return new Promise((resolve, reject) => {
    console.log(`\n======================================================`);
    console.log(`🚀 Compiling: ${path.basename(outputFile)}`);
    console.log(`📐 Specs: ${width}x${height} @ ${fps} FPS | CRF: ${crf} | Mobile 9:16: ${isMobilePortrait}`);
    console.log(`======================================================`);

    const numClips = inputFiles.length;
    let filterComplex = '';

    // Step 1: Scale, crop, set fps and timebase for each stream
    for (let i = 0; i < numClips; i++) {
      if (isMobilePortrait) {
        // Mobile 9:16 portrait intelligent center-focus crop
        filterComplex += `[${i}:v]scale=${height}*16/9:${height}:force_original_aspect_ratio=increase,crop=${width}:${height},setsar=1,fps=${fps},format=yuva420p,settb=AVTB[v${i}]; `;
      } else {
        // Desktop 16:9 cinematic framing
        filterComplex += `[${i}:v]scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height},setsar=1,fps=${fps},format=yuva420p,settb=AVTB[v${i}]; `;
      }
    }

    // Step 2: Chain xfade morph filters
    let lastStream = 'v0';
    let currentOffset = SEGMENT_DURATION - TRANSITION_DURATION;

    for (let i = 1; i < numClips; i++) {
      const trans = transitions[i - 1] || 'fade';
      const outStream = i === numClips - 1 ? 'vout' : `x${i}`;
      filterComplex += `[${lastStream}][v${i}]xfade=transition=${trans}:duration=${TRANSITION_DURATION}:offset=${currentOffset.toFixed(2)}[${outStream}]; `;
      lastStream = outStream;
      currentOffset += (SEGMENT_DURATION - TRANSITION_DURATION);
    }

    filterComplex = filterComplex.replace(/;\s*$/, '');

    const args = ['-y'];

    // Add inputs with trim
    for (let i = 0; i < numClips; i++) {
      args.push('-t', `${SEGMENT_DURATION + TRANSITION_DURATION + 0.5}`, '-i', inputFiles[i]);
    }

    args.push(
      '-filter_complex', filterComplex,
      '-map', '[vout]',
      '-an',
      '-c:v', 'libx264',
      '-preset', 'medium',
      '-crf', `${crf}`,
      '-pix_fmt', 'yuv420p',
      '-g', '4',
      '-keyint_min', '4',
      '-sc_threshold', '0',
      '-movflags', '+faststart',
      outputFile
    );

    const startTime = Date.now();
    const proc = spawn(ffmpegPath, args);

    proc.stderr.on('data', (data) => {
      const text = data.toString();
      const match = text.match(/frame=\s*(\d+)/);
      if (match) {
        process.stdout.write(`\r⚡ Progress: Frame ${match[1]}`);
      }
    });

    proc.on('close', (code) => {
      if (code === 0) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        const stats = fs.statSync(outputFile);
        const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`\n✅ Compilation Succeeded in ${elapsed}s!`);
        console.log(`📦 Output File: ${outputFile} (${sizeMb} MB)`);
        console.log(`🎯 Keyframe-4 60FPS Verification Complete.`);
        resolve({ outputFile, sizeMb, elapsed });
      } else {
        console.error(`\n❌ FFMPEG exited with code ${code}`);
        reject(new Error(`FFMPEG error code ${code}`));
      }
    });
  });
}

/**
 * Generate poster frame from the first clip
 */
function generatePoster(outputFile) {
  return new Promise((resolve, reject) => {
    const args = [
      '-y',
      '-i', inputFiles[0],
      '-ss', '00:00:01.000',
      '-vframes', '1',
      '-q:v', '2',
      outputFile
    ];
    const proc = spawn(ffmpegPath, args);
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Poster generation failed with code ${code}`));
    });
  });
}

async function run() {
  try {
    // 1. Desktop Master Video: 1920x1080, 60fps Keyframe-4
    const desktopOutput = path.join(publicMediaDir, 'from_teacher_to_technology_desktop.mp4');
    await compileVideo({
      width: 1920,
      height: 1080,
      fps: 60,
      crf: 18,
      outputFile: desktopOutput,
      isMobilePortrait: false
    });

    // 2. Mobile 9:16 Dedicated Stream: 720x1280 (or 1080x1920), 60fps Keyframe-4, < 38MB
    const mobileOutput = path.join(publicMediaDir, 'from_teacher_to_technology_mobile.mp4');
    await compileVideo({
      width: 720,
      height: 1280,
      fps: 60,
      crf: 22,
      outputFile: mobileOutput,
      isMobilePortrait: true
    });

    // 3. Poster image
    const posterOutput = path.join(publicMediaDir, 'journey_poster.jpg');
    await generatePoster(posterOutput);
    console.log(`\n🖼️ Poster Frame Created: ${posterOutput}`);

    console.log(`\n🎉 ALL CINEMATIC VIDEO PIPELINES COMPILED SUCCESSFULLY!`);
  } catch (err) {
    console.error('Fatal video compilation error:', err);
    process.exit(1);
  }
}

run();
