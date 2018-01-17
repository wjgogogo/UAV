class UavServer {
  constructor() {
    this.msgList = []
  }

  ReceiveMsg(msg) {
    function FormatMsg(msg) {
      let array = msg.split(/\s+/)

      let format = {}
      format.name = array[0]

      format.lastPos = array.length === 4 || array.length === 7 ? array.slice(1, 4).map(value => parseInt(value)) : null

      format.offset = array.length === 7 ? array.slice(4, 7).map(value => parseInt(value)) : null

      format.curPos = array.length === 4 ? format.lastPos : (array.length === 7 ? format.lastPos.map((value, index) => value + format.offset[index]) : null)

      format.error = false

      return format
    }

    let format = FormatMsg(msg)

    let resultWithNoData = this.msgList.length === 0 && format.lastPos !== null && format.offset === null

    let resultWithAlreadyHaveData = this.msgList.length !== 0 && this.msgList[this.msgList.length - 1].error === false && format.lastPos !== null && format.offset !== null && format.lastPos.toString() === this.msgList[this.msgList.length - 1].curPos.toString();

    if (!resultWithNoData && !resultWithAlreadyHaveData) {
      format.error = true;
    }

    this.msgList.push(format);

  }

  GetMsg(index) {
    let entry = this.msgList[index]
    if (!entry) {
      return `Cannot find ${index}`
    } else if (entry.error)
      return `Error: ${index}`
    else {
      return `${entry.name} ${index} ${entry.curPos.join(' ')}`
    }
  }
}