const mysql = require( 'mysql' );

export class Database {
    private connection:any;

    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }

    query( sql, args? ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }

    async insert( sql, args? ) {
        let temp;
        try{
            console.log("You're an idiot")
            temp = await new Promise( async ( resolve, reject ) => {
                await this.connection.query( sql, args, ( err, rows ) => {
                    if ( err )
                        return reject( err );
                    resolve( rows );
                    console.log("RESOLVED")
                }, 10000);
            });
        }catch(err){
            console.log(err);
        }
      
        return temp
    }

    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}