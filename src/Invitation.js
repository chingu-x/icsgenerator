const FileOps = require('./FileOps');

class Invitation {
  /**
   * Creates an instance of Extract.
   * @param {String} pathToModel Path to the .ics model file
   * @param {String} pathToRecipients Path to file containing recipient team details
   * @param {String} outputFilePath Path to the directory output files will be created in
   * @memberof Invitation
   */
  constructor(pathToModel, pathToRecipients, outputFilePath) {
    this.pathToModel = pathToModel;
    this.pathToRecipients = pathToRecipients;
    this.outputFilePath = outputFilePath;
  }

  /**
   * Load the model `.ics` file and the `.csv` file containing the event
   * recipients 
   * @memberof Invitation
   */
  loadFiles() {
    this.icsModel = FileOps.readFile(this.pathToModel)
      .split('\n');
    this.recipients = FileOps.readFile(this.pathToRecipients)
      .split('\n')
      .map(recipient => recipient.split(','));
  }

  /**
   * Create a calendar invitation for a team. Information about the 
   * `.ics` file format can be found at https://icalendar.org/
   * @param {Object} team Object containing team name and an array of
   * team members discord names & email addresses
   * @memberof Invitation
   */
  async createInvitation(team) {
    console.log(`...Processing team:${team.teamName} members:`, team.members);
    let eventInvitation = [];
    for (let i = 0; i < this.icsModel.length; i++) {
      let keyword = '';
      if ( this.icsModel[i].indexOf(';') !== -1 ) {
        keyword =  this.icsModel[i].substring(0,this.icsModel[i].indexOf(';')+1);
      } else {
        keyword =  this.icsModel[i].substring(0,this.icsModel[i].indexOf(':')+1);
      }
      switch (keyword) {
        case 'SUMMARY:':
            eventInvitation.push('SUMMARY: ' + team.teamName + ' Team Meeting');
          break;
        case 'ATTENDEE;':
            if ( this.icsModel[i].search(/<<placeholder>>/g) === -1 ) {
              eventInvitation.push(this.icsModel[i]);
            } else {
              for (let attendee of team.members) {
                let newLines = this.icsModel[i].replace(/<<placeholder>>/gi, attendee.email).match(/(.{1,75})/g)
                for (let k = 0; k < newLines.length; k++) {
                  if ( k === 0 ) {
                    eventInvitation.push(newLines[k]);
                  } else {                  
                    eventInvitation.push(' '+newLines[k]);
                  }
                }
              }
            }
          break;
        default:
          eventInvitation.push(this.icsModel[i]);
      }
    }
    await FileOps.objectToFile(this.outputFilePath+'/'+team.teamName+'.ics', eventInvitation);
  } 

  /**
   * Customize the model `.ics` for each recipient
   * @memberof Invitation
   */
  async generate() {
    console.log('Calendar invitation generation starting...\n');
    this.loadFiles();
    let combinedTeam = {
      teamName: '',
      members: [],  // Contains {discordName: ..., email: ...}
    };
    for (let i = 0; i < this.recipients.length; i++) { 
      let [ teamName, discordName, email ] = this.recipients[i];
      if ( combinedTeam.teamName === '' ) {
        combinedTeam.teamName = teamName;
      }
      if ( combinedTeam.teamName !== teamName) {
        this.createInvitation(combinedTeam);
        combinedTeam.teamName = teamName;
        combinedTeam.members = [];
      }
      combinedTeam.members.push({ discordName: discordName, email: email });
      if ( i === this.recipients.length -1 ) {
        this.createInvitation(combinedTeam);
      }
    }
    console.log('\nGeneration complete.');
  }
}

module.exports = Invitation;