# icsgenerator - Generate `.ics` files for team meetings

## Table of Contents

* [Overview](#overview)
* [Commands](#commands)
* [Dependencies](#dependencies)
* [Change Log](#change-log)
* [Contributing](#contributing)
* [Authors](#authors)
* [License](#license)

## Overview

icsgenerator creates `.ics` calendar invitation file by applying the contents
of a file containing recipient details with a model `.ics` file. The resulting
file can then be distributed to recipients so they can add them to their
personal calendars.

## Commands

### generate

**_Description:_** Generate `.ics` files 

**_Command:_** `icsgen generate -m <path-to-modelfile> -t <path-to-teamfile> -o <path-to-generated-files> '`

**_Options:_**
- `--model` specifies the path to the model `.ics` file. 
- `--team` specifies the path to the file containing recipient data.
- `--output` specifies the path to the directory where the customized `.ics`
files will be created. 

**_Examples:_**

Setup the environment variables for Discord extracts<br>
  `node ./icsgen generate -m ~/icsfiles/model.txt -t ~/icsfiles/teamdata.txt -o ~/icsfiles/customfiles`

## Dependencies

See the `package.json` file.

## Change Log

For more information see [Change Log](https://github.com/jdmedlock/icsgenerator/blob/development/docs/CHANGELOG.md)

## Contributing

See [Contributing](https://github.com/jdmedlock/icsgenerator/blob/development/docs/CONTRIBUTING.md)
and our [Collaborator Guide](https://github.com/jdmedlock/icsgenerator/blob/development/docs/COLLABORATOR_GUIDE.md).

## Authors

Developers on this project can be found on the [Contributors](https://github.com/jdmedlock/icsgenerator/graphs/contributors) page of this repo.

## License

[MIT](https://tldrlegal.com/license/mit-license)
