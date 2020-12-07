const minimist = require('minimist');
const yts = require('yt-search');
const youtubedl = require('youtube-dl');

module.exports = async () => {
  const args = minimist(process.argv.slice(2));

  let searchQuery = args._;
  searchQuery = searchQuery.join(' ');

  if (searchQuery) {
    try {
      const result = await yts(searchQuery);
      const vidUrl = (result.videos[0].url);

      console.log(vidUrl);
      try {
        youtubedl.exec(vidUrl, ['-x', '--audio-quality', '0'], {}, (err, output) => {
          console.log('error:', err);
          console.log('output:', output);
        });
      } catch (e) {
        console.log('caught error in execution: ', e);
      }
      console.log('Done downloading');
    } catch (e) {
      console.log('an error occured in processing');
      console.log('error:', e);
    }
  } else {
    console.log('an invalid search query was passed as an arg');
  }
};
