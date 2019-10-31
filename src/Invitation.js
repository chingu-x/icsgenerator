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

  async generate() {
    const icsModel = FileOps.readFile(this.pathToModel);
    console.log(icsModel);
  }

}

module.exports = Invitation;