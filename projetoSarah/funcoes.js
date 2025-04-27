var ctxCabecalho;
var ctxLinks;
var ctxConteudo;
var ctxRodape;
var ancora = true;

function configEstiloCabecalho()
{
    bg=document.getElementById("corFundo").value;
    corFonte=document.getElementById("corFonte").value;
    tamFonte=document.getElementById("tamFonte").value;
    tamDivCabecalho=document.getElementById("tamDivCabecalho").value;
    alturaCabecalho=document.getElementById("alturaCabecalho").value;
    ctxCabecalho="#cabecalho\n{\n background-color:"+bg+";\n";
    ctxCabecalho+=" inline-size:"+tamDivCabecalho+"vw;\n";
    ctxCabecalho+=" block-size:"+alturaCabecalho+"vh;\n";
    ctxCabecalho+=" color:"+corFonte+";\n";
    ctxCabecalho+=" font-size:"+tamFonte+"px;\n}\n";
    return ctxCabecalho;
}

function configEstiloConteudo()
{
    bg = document.getElementById("corFundoConteudo").value;
    ctxConteudo = "#conteudo\n{\nbackground-color:"+bg+";\n}";
    return ctxConteudo;
}

function configHTMLConteudo()
{
    let txtConteudo = "";
    let imagem=document.querySelector("#imagem").files[0].name;
    txtConteudo=document.querySelector("#txtConteudo").value;
    txtConteudo+=`<img src="imagens/${imagem}"></img>`;
    return txtConteudo;
}


function configHtmlLinks()
{
    links = document.getElementsByName("links");
    href = document.getElementsByName("href");
    ctxLinks="";
    for (let i = 0; i < links.length; i++) 
    {
        href = href[i].value.split("\\");
        ctxLinks += '<a href="'+href[href.length-1]+'">'+links[i].value+'</a>';
    }
    return ctxLinks;
}

function configHTMLCabecalho()
{
    let aux = document.querySelector("#textoCabecalho").value;
    ctxCabecalho = '<h1>'+aux+'</h1>';
    return ctxCabecalho;
}

function configEstiloLinks()
{
    corLink=document.getElementById("colorLinks").value;
    const estiloLinksInput = document.querySelector('input[name="estiloLinks"]:checked');
    if (estiloLinksInput) 
    {
        const estiloLinks = estiloLinksInput.value;
        console.log(estiloLinks);
    }else 
    {
        console.log("Nenhum estilo de link foi selecionado");
    }
    corLinkHover=document.getElementById("colorHover").value;
    ctxLinks="a\n{\n color:"+corLink+";\n";
    let aux=estiloLinks=="0"?"none":"underline";
    ctxLinks+=" text-decoration:"+aux+";\n}\n";
    ctxLinks+="a:hover\n{\n color:"+corLinkHover+";\n}\n";
    return ctxLinks;
}

function href()
{   
    let inputtext = document.createElement("input");
    let input = document.createElement("input");

    inputtext.type = 'text';
    inputtext.name = 'links';
    inputtext.id = 'links';
    inputtext.placeholder = 'link...';
    
    input.type = 'file';
    input.name = 'href';
    input.id = 'href';

    var div = document.querySelector(".hrefButtonInput");
    div.appendChild(inputtext);
    div.appendChild(input);
}

function removeHref() 
{
    var div = document.querySelector(".hrefButtonInput");
    var inputText = document.getElementById('links');
    var inputFile = document.getElementById('href');
    if (inputText) div.removeChild(inputText);
    if (inputFile) div.removeChild(inputFile);
}

function gerarCodigo()
{
    //Cóigo para CSS
     let codeCSS=document.querySelector("#codeCSS");
     let css=configEstiloCabecalho();
     css+=configEstiloLinks();
     css+=configEstiloConteudo();
     codeCSS.value=css;
    //Código para HTML
     let codeHTML=document.querySelector("#codeHTML");
     ctxHTML="<html>\n<meta-charset='utf-8'>\n<head>\n" +
         "<link rel='stylesheet' href='estilo.css'>\n"+
         "<title>Minha página</title>\n"+
         "</head>\n<body>" +
         "<div id='cabecalho'>"+configHTMLCabecalho()+"</div>\n" +
         "<nav id='links'>\n"+configHtmlLinks()+"\n</nav>\n" +
         "<div id='conteudo'>"+configHTMLConteudo()+"</div>\n" +
         "</body>\n</html>";
     codeHTML.value=ctxHTML;
}

function download(campo,arquivo)
{
    if(arquivo.trim()==='')
    {
        arquivo = document.getElementById("nomeHTML").value+".html";
    }
    var text = document.getElementById(campo).value;
    var blob = new Blob([text], {type:"text/plain"});
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = arquivo.trim();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function removeLinks(check)
{
    if(check.checked)
    {
        txt = "hidden";
        ancora = false;
    }else{
        txt = "visible";
        ancora = true;
    }
    document.querySelector("#areaLinks").style.visibility=txt;
}

function renderIframe()
{
    const iframe = document.getElementById('pagina');
    const htmlCode = document.getElementById('codeHTML').value;
    const cssCode = document.getElementById('codeCSS').value;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode,'text/html');

    const style = document.createElement('style');
    style.textContent = cssCode;

    if(doc.head)
    {
        doc.head.appendChild(style);
    }
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write('<!DOCTYPE html>\n' + doc.documentElement.outerHTML);
    iframeDoc.close();
}

function mostraOcultaDiv(id)
{
    const divs = document.querySelectorAll('.content');
    divs.forEach(div => div.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function aviso()
{
    alert("Para que o link funcione o arquivo de destino deve estar no diretório do projeto");
    return true;
}

function validarFormulario()
{
    var nomeHTML = document.getElementById('nomeHTML').value;
    if (nomeHTML === '') 
    {
        alert("Por favor, insira o nome do arquivo HTML.");
        return false;
    }

    var tamDivCabecalho = document.getElementById('tamDivCabecalho').value;
    if (tamDivCabecalho === '') 
    {
        alert("Por favor, insira a largura do cabeçalho.");
        return false;
    }

    var alturaCabecalho = document.getElementById('alturaCabecalho').value;
    if (alturaCabecalho === '') 
    {
        alert("Por favor, insira a altura do cabeçalho.");
        return false;
    }

    var textoCabecalho = document.getElementById('textoCabecalho').value;
    if (textoCabecalho === '') 
    {
        alert("Por favor, insira o texto para o cabeçalho.");
        return false;
    }

    var corFonte = document.getElementById('corFonte').value;
    if (corFonte === '--') 
    {
        alert("Por favor, selecione a cor da fonte.");
        return false;
    }

    var corFundo = document.getElementById('corFundo').value;
    if (corFundo === '--') 
    {
        alert("Por favor, selecione a cor de fundo.");
        return false;
    }

    var tamFonte = document.getElementById('tamFonte').value;
    if (tamFonte === '--') 
    {
        alert("Por favor, selecione o tamanho da fonte.");
        return false;
    }

    var noLinks = document.getElementById('noLinks').checked;
    if (!noLinks) 
    {
        var links = document.querySelectorAll('#areaLinks input[type="text"]');
        var linksPreenchidos = false;
        for (var i = 0; i < links.length; i++) 
        {
            if (links[i].value.trim() !== '') 
            {
                linksPreenchidos = true;
                break;
            }
        }
        if (!linksPreenchidos) 
        {
            alert("Por favor, insira pelo menos um link.");
            return false;
        }
        var estiloLinks = document.querySelectorAll('input[name="estiloLinks"]:checked');
        if (estiloLinks.length === 0) 
        {
            alert("Por favor, selecione o estilo para os links.");
            return false;
        }
    }

    return true;
}


