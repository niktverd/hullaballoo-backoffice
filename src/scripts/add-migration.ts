import { writeFileSync } from "fs";

export const addMigration = async () => {
    const name = process.argv[2];

    if (!name) {
        return console.log('Please enter migration_name', process.argv);
    }

    const date = new Date().toISOString().replace(/[^0-9]/g, '');
    writeFileSync(`./src/migrations/${date}_${name}.ts`, '', {encoding: 'utf-8'});
}

addMigration();