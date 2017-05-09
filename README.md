APP CCP OPERATIVO

    UsUaRIoMaStEr
    U$u4r1OM4$73R

BASE DE DATOS MONGO
    Intrucciones para respladar la base y restaurar
    	mongodump --out ~/Documents/ccp/db/backup/ --db ccp-dev1

    	mongorestore --db demos-dev ~/Documents/ccp/db/backup/backup/ccp-dev1
    Levantar el proyecto en la consola:
        meteor npm start
    Crear la base
        Cada proyecto que se inicia debe cotener su propia base de datos en mongodb.
    Acceder a la base desde la consola
        la URL:
            Colocar la siguiente linea en la consola.
            Linux:
                export MONGO_URL=mongodb://localhost:27017/ccp-dev1
            Windows:
                SET MONGO_URL=mongodb://127.0.0.1:27017/ccp-dev1
    Importar / Exportar Collections
        mongoexport --db ccp-dev1 --collection tallas --out tallas.json
        
        mongoimport --host localhost --port 27017 --collection marcas --db ccp-dev1 --file marcas.json
                
        mongoimport --host localhost --port 27017 --db ccp-dev1 --collection marcas --type csv --headerline --file marcas.csv
        // Aunque de momento este ya no lo estamos usando porque estamos con los fixtures importando las collections alojadas en
        la carpeta /private
        
        
    Respaldar base de datos
    
        RESPALDAR:
            Linux
                mongodump --out ~/Documents/demos/baseDatos/backup/ --db ccp-dev1
        
            Windows
                mongodump --out C:\a1\ccp\db\backup --db ccp-dev1
            
        RESTAURAR:
            Linux
                mongorestore --db demos-dev ~/Documents/demos/baseDatos/backup/demos-dev1
            
            Windows
                mongorestore --db ccp-dev1 C:/respandos_mongo/ccp-dev1-170330

    COMANDOS GIT
        Iniciar Git
        
            git init
            git add .
            git commit -m "Commit Inicial"
        
        Clonar un proyecto
            git clone [la ruta a clonar]
            meteor npm install
    
    PROYECTO DESDE DESDE CERO
        Las siguientes dependencias ya venías instaladas por defecto:
            meteor-node-stubs@~0.2.0
            angular-meteor@^1.3.11
        Comandos ejecutados en la consola (tutorial angular-meteor):
            $ meteor remove blaze-html-templates
            $ meteor remove insecure
            $ meteor remove autopublish
            $ meteor remove ecmascript
            $ meteor npm --save install angular-meteor@1.3.11
            $ meteor npm --save install angular@1.5.8
            $ meteor npm --save install babel-runtime@6.22.0
            $ meteor npm --save install angular-ui-router@0.3.1
            $ meteor npm --save install angular-utils-pagination@0.11.1
            $ meteor npm --save install angular-simple-logger@0.1.7
            $ meteor npm --save install bootstrap@3.3.7
            $ meteor npm --save install angular-animate@1.5.8
            $ meteor npm --save install angular-messages@1.5.8
            $ meteor npm --save install angular-ui-bootstrap@2.5.0
            $ meteor npm --save install angular-ui-grid@4.0.2
            $ meteor npm --save install bcrypt@0.8.7
            $ meteor npm --save install bootstrap-social@5.0.0
            $ meteor npm --save install font-awesome@4.7.0
            $ meteor npm install --save csvtojson // ¡PENDIENTE DE INSTALAR (si es que queremos instalarla)!
            $ meteor add angular-templates@1.0.9
            $ meteor add pbastowski:angular-babel@1.3.7
            $ meteor add accounts-password@1.3.3
            $ meteor add dotansimha:accounts-ui-angular@0.0.4
            $ meteor add tmeasday:publish-counts@0.8.0
            $ meteor add fortawesome:fontawesome@4.7.0
            $ meteor add mrt:moment@2.8.1
            $ meteor add service-configuration@1.0.11
            $ meteor add mdg:validated-method@1.1.0
            $ meteor add aldeed:simple-schema@1.5.3
            $ meteor add mdg:validation-error@0.2.0
            $ meteor add tunifight:loggedin-mixin@0.1.0
            $ meteor add tmeasday:publish-counts@0.8.0
            $ meteor add aldeed:collection2@2.10.0
            $ meteor add dburles:collection-helpers@1.1.0
            $ meteor add reywood:publish-composite@1.4.2
            $ meteor add ziarno:provide-mixin@0.0.1
            $ meteor add shell-server@0.2.1
            $ meteor add meteorhacks:aggregate@1.3.0
            $ meteor add didericis:callpromise-mixin@0.0.1
            $ meteor add u2622:persistent-session@0.4.4
        No instaladas
            $ meteor add accounts-facebook
