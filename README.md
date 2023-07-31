# TRAVEL APP BACK

## Notas

- tsconfig-paths permite usar paths junto con ts-node-dev
- la ruta a los archivos \*.d.ts (@types) no se puede mezclar con nada, y la subcarpeta por ejemplo "express" tiene que coincidir con la del node_modules. En el archivo tsconfig.json, en typeRoots tiene que ir primero la ruta a @types y luego los node_modules, para que primero busque en el modulo que hemos creado. El orden es ese y es importante
