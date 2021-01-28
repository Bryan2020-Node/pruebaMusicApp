//================================================
//          Establecer el puerto
//================================================

process.env.PORT = process.env.PORT || 3000;


//================================================
//          Entorno
//================================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



//================================================
//          Vencimiento del token
// 60 segundos * 60 minutos * 24 horas * 30 dias
//================================================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//================================================
// SEED de autenticación
//================================================
// process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


//================================================
//      Base de Datos
//================================================

let urlDB = 'mongodb+srv://strider:xtU2ZuZnqRA8q0nq@cluster0.15wnd.mongodb.net/musicaApp';

// if (proces.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost:27017/musicaApp';
// } else {
//     urlDB = process.env.MONGO_URI;
// }




process.env.URLDB = urlDB;