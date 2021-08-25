let fs=require('fs');
const { type } = require('os');
let path =require('path');
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    pictures: ['png','jpg','jpeg']
}

function organizeFn(srcPath){
    //takes all the files in the folder whose path is provided
    let entities=fs.readdirSync(srcPath);
    //we join the source path with organizeFolder which would contain all the required folders
    let organizeFolder=path.join(srcPath,'organizedFiles');
    // console.log(organizeFolder);
    //if that particular folder is not created then only create the folder
    if(!fs.existsSync(organizeFolder)){
        fs.mkdirSync(organizeFolder);
    }

    for(let i=0;i<entities.length;i++){
        
        //entities[i] represent file name
        let file=entities[i];
       
        // console.log(file);
        //function to check the file name
            let type=checkType(file);
            //joining the organizeFolder with type of folder
            let typeFolder=path.join(organizeFolder,type);
            //if the typefolder is not created in organizefolder
            if(!fs.existsSync(typeFolder)){
                fs.mkdirSync(typeFolder)
            }

            let src=path.join(srcPath,entities[i]); //file that we're looping on
            let dest=path.join(typeFolder,entities[i]); //file in typeFolder
            fs.copyFileSync(src,dest); //copying the src file in the dest file

        
        // console.log(typeFolder)

    }
}
//to check the file type such as media document archive or something else
function checkType(file){
    for(let type in types){ //type would be such as media documents
        for(let ext of types[type]){  //ext pdf 
            if(path.extname(file).split('.')[1] == ext){   //['.','pdf'] would compare with the first index of array
                return type;
            }
        }
    }
    return 'others'; //if the file extension doesn't exist then put that in others folder
}


module.exports={
    organizeFn:organizeFn
}