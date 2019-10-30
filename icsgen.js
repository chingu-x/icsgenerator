const FileOps = require('./src/util/FileOps');
const program = require('commander');

program 
  .command('gen')
  .description('Generate .ics meeting files')
  .option('-m, --model <model-path>', 'Path to the .ics model file')
  .option('-t, --team <team-path>', 'Path to file containing recipient team details')
  .option('-o, --output <output-path>', 'Path to the directory output files will be created in')
  .action(async (args) => {
    console.log('\nextract subcommand options:');
    console.log('--------------------------');
    console.log('- __dirname:', __dirname);
    console.log('- model: ', args.model);
    console.log('- team: ', args.team);
    console.log('- output: ', args.output);

    const discord = new Discord(process.env.CATEGORY_INCLUDE, 
        process.env.CHANNEL_INCLUDE, process.env.CHANNEL_EXCLUDE, 
        process.env.DS_USER_EXCLUDE, 
        args.output, args.prefix, args.suffix);
    await discord.extractMetrics(args.password);

  });
 
program.parse(process.argv);
