const humanize = require('humanize');
const imagemin = require('imagemin')
const imageminPngquant = require('imagemin-pngquant');
const imageminGifSicle = require('imagemin-gifsicle');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminJpegTran = require('imagemin-jpegtran');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminSvgo = require('imagemin-svgo');
const { basename } = require ('path');

const { getTotalSize, getFileSize } = require('./utility');

const prepareBatches = (array, itemsPerChunk) => {
  return array.reduce((ar, it, i) => {
    const ix = Math.floor(i/itemsPerChunk);

    if(!ar[ix]) {
      ar[ix] = [];
    }

    ar[ix].push(it);

    return ar;
  }, []);
}

exports.minify = (images, outputPath, config) => {
  return new Promise((resolve, reject) => {
		if (!Array.isArray(images)) reject(new Error('[Minifier] images parameter should be of type array'));

    const { compressionQuality } = config;
    let index = 0;
    let imagesToBeProcessed = prepareBatches(images, 5)
    let processedImages = []
    const before = new Date().toLocaleString();

    const nextBatch = () => {
      if (index < imagesToBeProcessed.length) {
        imagemin(imagesToBeProcessed[index], outputPath, {
          use: [
            imageminSvgo(),
            imageminJpegTran(),
            imageminMozjpeg(),
            imageminJpegRecompress(),
            imageminGifSicle(),
            imageminPngquant({quality: `${compressionQuality - 5}-${compressionQuality}`})
          ],
        }).then(minifiedImages => {
          processedImages = processedImages.concat(minifiedImages);

          index += 1;
          nextBatch();
        }, (error) => {
          reject(error);
        });
      } else {
        const stats = generateStats(images, processedImages);

        resolve({
          processedImages: processedImages,
          stats: stats
        });
      }
    }

    nextBatch();
  });
}

const generateStats = (beforeImages, afterImages) => {
  const totalBeforeSize = getTotalSize(beforeImages);
  const totalAfterSize = getTotalSize(afterImages.map(image => image.path));

  const files = [];
  for (let index = 0; index < beforeImages.length; index++) {
    const beforeImage = beforeImages[index];
    const afterImage = afterImages[index].path;
    const beforeImageFileSize = getFileSize(beforeImage);
    const afterImageFileSize = getFileSize(afterImage);
    const savedBytes = beforeImageFileSize - afterImageFileSize
    const filename = basename(beforeImage);

    files.push({
      name: filename,
      beforeBytes: beforeImageFileSize,
      afterBytes: afterImageFileSize,
      savedBytes: savedBytes
    });
  }

  return {
    totalBeforeSize: totalBeforeSize,
    totalAfterSize: totalAfterSize,
    savedBytes: totalBeforeSize - totalAfterSize,
    files: files
  };
}
