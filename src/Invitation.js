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
   * Create a calendar invitation for a recipient. Information about the 
   * `.ics` file format can be found at https://icalendar.org/
   * @param {String} teamName Recipient team name
   * @param {String} discordName Recipient's Discord user name
   * @param {String} email Recipient email address
   * @param {String} ianaTZ Recipient IANA timezone
   * @memberof Invitation
   */
  async createInvitation(teamName, discordName, email, ianaTZ) {
    console.log(`Processing team:${teamName} discord:${discordName} email:${email} tz:${ianaTZ}`);
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
            eventInvitation.push('SUMMARY: ' + teamName + ' Team Meeting');
          break;
        case 'ATTENDEE;':
            eventInvitation.push(this.icsModel[i].replace(/<<placeholder>>/gi, email));
          break;
        default:
          eventInvitation.push(this.icsModel[i]);
      }
    }
    await FileOps.objectToFile(this.outputFilePath+'/'+teamName+'_'+discordName+'.ics', eventInvitation);
  } 

  /**
   * Customize the model `.ics` for each recipient
   * @memberof Invitation
   */
  async generate() {
    console.log('Calendar invitation generation starting...');
    this.loadFiles();
    for (let i = 0; i < this.recipients.length; i++) { 
      let [ teamName, discordName, email, ianaTZ ] = this.recipients[i];
      this.createInvitation(teamName, discordName, email, ianaTZ);
    }
    console.log('Generation complete.');
  }
}

module.exports = Invitation;