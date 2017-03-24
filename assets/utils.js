const markReg = (str) => /\"(.*)\"/g.exec(str)[1];



export { markReg }