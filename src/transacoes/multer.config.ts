import { MulterModuleOptions } from '@nestjs/platform-express/multer';
import * as multer from 'multer';

export const multerConfig: MulterModuleOptions = {
    storage: multer.memoryStorage(),
    fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            return callback(new Error('Tipo de Imagem incompatível!'), false);
        }
        callback(null, true);
    },
};