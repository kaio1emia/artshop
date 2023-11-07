
//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");


//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3003;


//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/artshop',
{   useNewUrlParser: true,
    useUnifiedTopology: true
});


//criando a model do usuario
const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    Senha : { type : String}
    
});


const Usuario = mongoose.model("Usuario", UsuarioSchema);


//configurando os roteamentos do usuario
app.post("/cadastroUsuario", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha;



    const usuario = new Usuario({
        email : email,
        senha : senha
    });


    try{
        const newUsuario = await usuario.save();
        res.json({error : null, msg : "Cadastro ok", usuarioId : newUsuario._id});
    } catch(error){
        res.status(400).json({error});
    }


});


//criando a model do produtoart
const ProdutoartSchema = new mongoose.Schema({
    id_produtoart : {type : Number,  required : true},
    Descrição : {type : String},
    Artista : { type : String},
    Data_criação : {type : Date},
    Quantidade_estoque : {type : Number, required : true}
});


const Produtoart = mongoose.model("Produtoart", ProdutoartSchema);


//configurando os roteamentos
app.post("/cadastroProdutoart", async(req, res)=>{
    const id_produtoart = req.body.id_produtoart;
    const Descrição = req.body.Descrição;
    const Artista = req.body.Artista;
    const Data_criação = req.body.Data_criação;
    const Quantidade_estoque  = req.body.Quantidade_estoque;


    const produtoart = new Produtoart({
        id_produtoart : id_produtoart,
        Descrição : Descrição,
        Artista : Artista,
        Data_criação : Data_criação,
        Quantidade_estoque : Quantidade_estoque
    })


    try{
        const newProdutoart = await produtoart.save();
        res.json({error : null, msg : "Cadastro ok", produtoartId : newProdutoart._id});
    } catch(error){
        res.status(400).json({error});
    }


});

app.get("/produtoart", async(req, res)=>{
    res.sendFile(__dirname +"/produto.html");
})

app.get("/usuario", async(req, res)=>{
    res.sendFile(__dirname +"/usuario.html");
})

app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/home.html");
})

//configurando a porta
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})