const fs = require('fs');

const target = process.argv[2];


fs.readdir('./'+target, function(err, files){
    if(err){
        console.log(err);
        throw err;
    }
    
    for(let i = 0; i < files.length; i++){
        let fileName = files[i];

        if(fileName.indexOf('mp4')>-1 || fileName.indexOf('mov')>-1){
            // 동영상 폴더 만들기
            if(!fs.existsSync(`./${target}/vedio`)){
                fs.mkdirSync(`./${target}/vedio`);
            }

            fs.renameSync(`./${target}/${fileName}`, `./${target}/vedio/${fileName}`, function(){
                console.log(`move ${fileName} to vedio`);
            });
        }else if(fileName.indexOf('png')>-1 || fileName.indexOf('aae')>-1){
            // 캡쳐 폴더 만들기
            if(!fs.existsSync(`./${target}/capture`)){
                fs.mkdirSync(`./${target}/capture`);
            }

            fs.renameSync(`./${target}/${fileName}`, `./${target}/capture/${fileName}`, function(){
                console.log(`move ${fileName} to capture`);
            });
        }else if(fileName.indexOf('_E')>-1){
            // 중복 폴더 만들기
            if(!fs.existsSync(`./${target}/duplicate`)){
                fs.mkdirSync(`./${target}/duplicate`);
            }

            var duplicateName = fileName.substring(0, fileName.indexOf('E')) + fileName.substring(fileName.indexOf('E')+1, fileName.length);

            fs.renameSync(`./${target}/${duplicateName}`, `./${target}/duplicate/${duplicateName}`, function(){
                console.log(`move ${duplicateName} to duplicate`);
            });
        }

    }

    console.log('Done!');
});


  