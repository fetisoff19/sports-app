const fs = require('fs');
const config = require('config')

class FileService{

  createDir(id){
    const path = this.getPath(null, id)
    return new Promise((resolve, reject) => {
      try {
        if(!fs.existsSync(path)){
          fs.mkdirSync(path)
          return resolve({message: 'File was created'})
        } else {
          return reject({message: 'File already exist'})
        }
      } catch (e) {
        return reject({message: 'File error'})
      }
    })
  }

  createFile(file, data){
    const path = this.getPath(file)
    return new Promise((resolve, reject) => {
      try {
        if(!fs.existsSync(path)){
          fs.writeFileSync(path, data || '')
          return resolve({message: 'File was created'})
        } else {
          return reject({message: 'File already exist'})
        }
      } catch (e) {
        return reject({message: 'File error'})
      }
    })
  }

  deleteFile(file) {
    const path = this.getPath(file)
      fs.unlinkSync(path)
  }

  deleteAllFiles(userId, type){
    const path = config.get("filePath") + '\\' + userId
    fs.readdir(path, (err, files) => {
      files?.forEach(file => file.match(type) && fs.unlinkSync(path + '\\' + file))
    })
  }

  deleteUserDir(userId){
    console.log('deleteUserDir', userId)
    const path = config.get("filePath") + '\\' + userId
    fs.rmSync(path, {recursive: true, force: true });
  }


  getPath(file, userId) {
    if(file?.user && file?.path.length){
      return config.get("filePath") + '\\' + file.user + '\\' + file.path;
    } else if(file?.name && userId) {
      return config.get("filePath") + '\\' + userId + '\\' + file.name;
    } else return config.get("filePath") + '\\' + userId;
  }

}


module.exports = new FileService();