module.exports = class CliOptions {
  format
  hideCursor
  synchronousUpdate

  constructor (format, hideCursor, synchronousUpdate) {
    this.format = format
    this.hideCursor = hideCursor
    this.synchronousUpdate = synchronousUpdate
  }
}
