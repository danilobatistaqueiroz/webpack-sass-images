#### Webpack é um Module Bundler e Taskrunner
Ele automatiza tarefas repetitivas, bem como também tem um midleware, e utiliza um servidor node.js com express  

O **Webpack** é um framework, nele você utiliza os **loaders** e **plugins**  


você pode rodar com:  
`npx webpack`

pode também:  
`npx webpack --config webpack.config.js`  

e usando npm:  
modo produção  
`npm run build`

modo desenvolvimento  
`npm run dev`  



o arquivo **package.json** possui a configuração para o npm rodar o **webpack**:  
```javascript
  "scripts": {
    "build": "webpack"
  },
```

se o **webpack** for instalado de forma global:  
`npm install webpack -g`  

então é só chamar com:  
`webpack`  

O **webpack** por padrão não aceita css, e nenhum outro formato a não ser js

Esse projeto aceita js, css, sass, fontes e imagens

Para ele aceitar css foi necessário seguir os seguintes passos:  

adicionar os módulos npm:  
**style-loader** para adicionar os css numa tag <style>   
**css-loader** para compactar todos os css num JSON no bundle:  
`npm install --save-dev style-loader css-loader`  

para aceitar sasss:  
`npm install sass-loader node-sass --save-dev` 

para aceitar fontes e imagens usa-se **file-loader**:  
`npm install --save-dev file-loader`  

é necessário adicionar um import para o css:  
`import './styles/style.css';`  

também é necessário adicionar as imagens e arquivos sass no index.js:  
`import Icon from './images/home.ico';`  
`import './styles/appStyles.scss';`  

e adicionar os módulos npm no **webpack.config.js**:  
```javascript
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader']
      },
    ],
  },
  ```

#### watch mode

Para que ele fique olhando os arquivos e caso haja uma alteração ele já execute o bundle.  
Basta colocar no `webpack.config.js` a instrução **watch:true**


#### html-webpack-plugin 

Com o **html-webpack-plugin** você pode gerar a página principal que utiliza o bundle de forma dinânica  

`npm install html-webpack-plugin`  

No **webpack.config.js** utilizar o plugin:  
`var HtmlWebpackPlugin = require('html-webpack-plugin');`

Configurando o `webpack.config.js` você pode gerar a página com base num template:  
```javascript
  plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        title: 'My Awesome application',
        myPageHeader: 'Hello World',
        template: './src/scripts/index.html',
        filename: 'index.html',
        path: path.resolve(__dirname, 'dist'),
    })
  ],
```

#### Separação de Bundle de arquivos do projeto e Bundle de módulos do npm
Adicione uma importação para o **package.json** no **webpack.config.js**:  
`var package = require('../package.json');`  

Altere as configurações para gerar os dois bundles:  
```javascript
  entry: {
    app: "./src/scripts/app.js",
    vendor: Object.keys(package.dependencies)
  },
  output: {
    filename: "./dist/[name].bundle.js" 
  },
  node: {
    fs: 'empty', module: 'empty'
  },
```

Nessa versão do **Webpack** é necessário informar que os pacotes **fs**, e **module** são vazios  



#### Limpando a pasta Dist

Com **clean-webpack-plugin** você pode limpar a pasta de output:  

instala primeiro o módulo npm:  
`npm install --save-dev clean-webpack-plugin`  

e configura no **webpack.config.js**:  
```javascript
const CleanWebpackPlugin = require('clean-webpack-plugin');
...
plugins: [
  ...
  new CleanWebpackPlugin()
],
```

#### Compatibilidade com navegadores antigos

`npm install babel-loader @babel/core @babel/preset-env --save-dev`

**webpack.config.js**  
```javascript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
```

#### Refresh automatico quando um arquivo for alterado

`npm install webpack-dev-server --save-dev`

**package.json**  
```javascript
  "scripts": {
    "dev": "webpack-dev-server --mode development"
```

**webpack.config.js**  
```javascript
  watch:false,
  devServer: {
    contentBase: './dist',
    open: true
  },
```


#### CommonsChunkPlugin

Plugin para se criar um arquivo js separado quando vários arquivos fazem referência a outro.  
E eles acabam incorporando ele dentro do bundle.  
Esse plugin serve para evitar que mais de um arquivo bundle venha a conter a mesma cópia de outro arquivo js.  
Assim o plugin gera um arquivo .js separado e o browser vai precisar baixar apenas uma vez.  

**webpack.config.js**  
```javascript
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
....
    plugins: [
        new CommonsChunkPlugin({
                name: 'shared',
                minChunks: 2
        }),
```

#### Gerando um arquivo bundle.css separado

`npm install --save-dev mini-css-extract-plugin` 

**webpack.config.js**  
```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
```

#### Otimização para carregamento de imagens

Converter as imagens em strings base64.  
Essa conversão é boa para imagens pequenas.  
Por conta disso pode-se utilizar o parâmetro `limit`  

`npm install url-loader file-loader --save-dev`


**webpack.config.js**  
```javascript
      {
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [{
            loader: 'url-loader',
            options: { 
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
            } 
        }]
      },
```

a imagem `images/nature.jpeg` não será convertida em base64 pois passa do limite de 8kb


#### Parametro Devtools  

--devtools this option controls if and how source maps are generated

`npm run dev -- --devtools false`


#### O que é um source map

a source map consists of a whole bunch of information that can be used to map the code within a compressed file back to it’s original source.

You indicate to the browser that a source map is available by adding a special comment to the bottom of your optimised file.

//# sourceMappingURL=/path/to/script.js.map

This comment will usually be added by the program that was used to generate the source map. The developer tools will only load this file if support for source maps is enabled and the developer tools are open in the Browser.

You can also specify a source map is available by sending the X-SourceMap HTTP header in the response for the compressed JavaScript file.

X-SourceMap: /path/to/script.js.map

The source map file contains a JSON object with information about the map itself and the original JavaScript files.

It's possible to generate Source Maps with UglifyJS





#### Why you should learn Webpack?

. Beneficial for building complex front-end applications
. Elimination of dead assets
. Splitting code made easier
. Controlling how assets are processed
. Stable production deploys
. Excellent speeds when used accurately