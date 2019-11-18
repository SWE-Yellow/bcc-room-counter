const mysql = require( 'mysql' );

export class Database {
    private connection:any;
    private config:any;

    constructor( config ) {
        this.config = config
    }

    public connect() {
        this.connection = mysql.createConnection( this.config );
    }

    public query( sql, args? ): Promise<Array<any>>{
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    reject( err );
                resolve( rows );
            } );
        } );
    }

    public async insert( sql, args? ): Promise<boolean> {
        return await new Promise(( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err ) {
                    // console.log(err)
                    reject( false );
                }
                    
                resolve( true );
            } );
        } );
    }

    public delete(sql, args? ): Promise<boolean>{
        return this.insert(sql, args)
    }

    public update(sql, args? ): Promise<boolean>{
        return this.insert(sql, args)
    }

    public close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}