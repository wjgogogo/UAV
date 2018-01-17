describe('UavServer Test', () => {

  let uavServer = null
  beforeEach(() => {
    uavServer = new UavServer()
  });

  describe('Test for the UAVServer with empty message list', () => {

    it('should return \'plane1 0 1 1 1\' when given \'plane1 1 1 1\' and search for index of 0', () => {
      uavServer.ReceiveMsg('plane1 1 1 1')
      expect(uavServer.GetMsg(0)).toEqual('plane1 0 1 1 1')
    });

    it('should return \'Cannot find 0\' when don\'t give message and search for index of 0', () => {
      expect(uavServer.GetMsg(0)).toEqual('Cannot find 0')
    });

    it('should return \'Error: 0\' when give \'plane1\' and search for index of 0', () => {
      uavServer.ReceiveMsg('plane1')
      expect(uavServer.GetMsg(0)).toEqual('Error: 0')
    });

    it('should return \'Error: 0\' when give \'plane1 1\' and search for index of 0', () => {
      uavServer.ReceiveMsg('plane1 1')
      expect(uavServer.GetMsg(0)).toEqual('Error: 0')
    });

    it('should return \'Error: 0\' when give \'plane1 1 1 1 1\' and search for index of 0', () => {
      uavServer.ReceiveMsg('plane1 1 1 1 1')
      expect(uavServer.GetMsg(0)).toEqual('Error: 0')
    });

    it('should return \'Error: 0\' when give \'plane1 1 1 1 1 1 1\' and search for index of 0', () => {
      uavServer.ReceiveMsg('plane1 1 1 1 1 1 1')
      expect(uavServer.GetMsg(0)).toEqual('Error: 0')
    });

    it('should return \'Error: 0\' when give \'plane1 1 1 1 1 1 1 1\' and search for index of 0', () => {
      uavServer.ReceiveMsg('plane1 1 1 1 1 1 1 1')
      expect(uavServer.GetMsg(0)).toEqual('Error: 0')
    });
  });

  describe('Test for the UAVServer with not empty message list', () => {

    beforeEach(() => {
      uavServer.ReceiveMsg('plane1 1 1 1')
    });

    it('should return \'plane1 1 2 2 2\' when give \'plane1 1 1 1\' and \'plane1 1 1 1 1 1 1\' and search for index of 1', () => {
      uavServer.ReceiveMsg('plane1 1 1 1 1 1 1')
      expect(uavServer.GetMsg(1)).toEqual('plane1 1 2 2 2')
    });

    it('should return \'Cannot find 1\' when given \'plane1 1 1 1\' and search for index of 1', () => {
      expect(uavServer.GetMsg(1)).toEqual('Cannot find 1')
    });

    it('should return \'Error: 1\' when give \'plane1 1 1 1\' and \'plane1 1\' and search for index of 1', () => {
      uavServer.ReceiveMsg('plane1 1')
      expect(uavServer.GetMsg(1)).toEqual('Error: 1')
    });

    it('should return \'Error: 1\' when give \'plane1 1 1 1\' and \'plane1 1 1 1\' and search for index of 1', () => {
      uavServer.ReceiveMsg('plane1 1 1 1')
      expect(uavServer.GetMsg(1)).toEqual('Error: 1')
    });

    it('should return \'Error: 1\' when give \'plane1 1 1 1\' and \'plane1 1 1 1 1\' and search for index of 1', () => {
      uavServer.ReceiveMsg('plane1 1 1 1 1')
      expect(uavServer.GetMsg(1)).toEqual('Error: 1')
    });

    it('should return \'Error: 1\' when give \'plane1 1 1 1\' and \'plane1 1 1 1 1 1 1 1\' and search for index of 1', () => {
      uavServer.ReceiveMsg('plane1 1 1 1 1 1 1 1')
      expect(uavServer.GetMsg(1)).toEqual('Error: 1')
    });

    it('should return \'Error: 1\' when give \'plane1 1 1 1\' and \'plane1 2 1 1 1 1 1\' and search for index of 1', () => {
      uavServer.ReceiveMsg('plane1 2 1 1 1 1 1')
      expect(uavServer.GetMsg(1)).toEqual('Error: 1')
    });

    it('should return \'Error: 2\' when give \'plane1 1 1 1\' and  \'plane1 1 1 1 1 1\' and \'plane1 1 1 1 1 1 1\' and search for index of 2', () => {
      uavServer.ReceiveMsg('plane1 1 1 1 1 1')
      uavServer.ReceiveMsg('plane1 1 1 1 1 1 1')
      expect(uavServer.GetMsg(2)).toEqual('Error: 2')
    });

    it('should return \'Error: 3\' when give \'plane1 1 1 1\' and \'plane1 1 1 1 1 1\' and \'plane1 2 1 1 1 1 1\' and \'plane1 2 2 2 1 1 1\' and search for index of 3', () => {
      uavServer.ReceiveMsg('plane1 1 1 1 1 1')
      uavServer.ReceiveMsg('plane1 1 1 1 1 1 1')
      uavServer.ReceiveMsg('plane2 2 2 2 1 1 1')
      expect(uavServer.GetMsg(3)).toEqual('Error: 3')
    });
  });

  afterEach(() => {
    uavServer.msgList = null
    uavServer = null
  });
});

describe('Homework Test', () => {
  let uavServer = null
  beforeEach(() => {
    uavServer = new UavServer()
    uavServer.ReceiveMsg('plane1 1 1 1')
    uavServer.ReceiveMsg('plane1 1 1 1 1 2 3')
    uavServer.ReceiveMsg('plane1 2 3 4 1 1 1')
    uavServer.ReceiveMsg('plane1 3 4 5')
    uavServer.ReceiveMsg('plane1 1 1 1 1 2 3')
  });

  it('should return \'plane1 2 3 4 5\' when search for index of 2', () => {
    expect(uavServer.GetMsg(2)).toEqual('plane1 2 3 4 5')
  });

  it('should return \'Error: 4\' when search for index of 4', () => {
    expect(uavServer.GetMsg(4)).toEqual('Error: 4')
  });

  it('should return \'Cannot find 100\' when search for index of 100', () => {
    expect(uavServer.GetMsg(100)).toEqual('Cannot find 100')
  });

  afterEach(() => {
    uavServer.msgList = null
    uavServer = null
  });
});