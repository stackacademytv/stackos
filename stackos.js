
/**
 * Modules
 */
const os = require('os')
const chalk = require('chalk')

/**
 * Identify OS nice name
 */
let osType = 'Unknown'
switch (os.type()) {
  case 'Darwin': osType = 'MacOS'
  break;
  case 'Linux': osType = 'Linux'
  break;
  case 'Windows_NT': osType = 'Windows'
  break;
}

// Module Exports
module.exports = {

  /**
   * Machine info
   */
  info: {
    os: osType,
    arch: os.arch(),
    cpus: {
      cores: os.cpus().length,
      model: os.cpus()[0].model
    },
    memory: {
      total: os.totalmem(),
      free: os.freemem()
    },
    dir: {
      home: os.homedir(),
      tmp: os.tmpdir()
    }
  },

  /**
   * Log a fancy summary of the machine
   */
  log: function() {

    // Get cores nicename
    let cores = this.info.cpus.cores
    switch (cores) {
      case 2: cores = 'Dual'
        break;
      case 4: cores = 'Quad'
        break;
      case 8: cores = 'Octa'
        break;
    }

    // Chalk strings
    const out = {
      os: chalk.green( this.info.os ),
      arch: chalk.grey( this.info.arch ),
      cores: `${cores} Core`,
      cpu: chalk.grey(this.info.cpus.model),
      ram: Math.floor( this.info.memory.total /1000000000 ) + 'GB RAM'
    }

    // Log
    console.log(
      os.EOL,
      out.os,
      out.arch,
      os.EOL,
      out.cores,
      out.cpu,
      os.EOL,
      out.ram
    )
  }
}
