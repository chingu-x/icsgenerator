const program = require('commander');
const FileOps = require('./src/FileOps');
const Invitation = require('./src/Invitation');

program 
  .command('generate')
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

    if ( args.model === undefined ) {
      throw new Error('Model file path (-m parameter) not defined');
    }
    if ( args.team === undefined ) {
      throw new Error('Recipient file path (-t parameter) not defined');
    }
    if ( FileOps.validateDirPath(args.output) !== 0 ) {
      throw new Error('Output file path (-o parameter) is not a directory');
    }

    const invitation = new Invitation(args.model, args.team, args.output);
    await invitation.generate();

  });
 
program.parse(process.argv);
