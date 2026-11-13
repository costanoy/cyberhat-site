# cyberhat.com.br

Site da Cyberhat. Estático, sem build: é só abrir o `index.html`.

```
index.html            página única (abertura, projetos, sobre, rodapé)
css/style.css         estilos
js/data.js            projetos e textos PT/EN
js/main.js            idioma, filtro, painel em destaque, adesivos, linha do tempo
assets/               emblema: logo-gf.webp (usado na página, 480 px), logo-gf.png
                      (original 922x696, base dos ícones) e logo-gf-sm.png (128 px)
videos/*.webm         prévias dos projetos
favicon.ico           ícone da aba (16, 32 e 48 px)
apple-touch-icon.png  ícone da tela inicial no iPhone (180 px)
og-image.png          imagem de compartilhamento (1200x630)
.htaccess             HTTPS, www -> sem www, MIME do webm, gzip e cache
robots.txt            libera tudo e aponta para o sitemap
sitemap.xml           URL raiz
```

## Projetos

Tudo sai de `js/data.js` (os campos estão descritos no topo do arquivo). A ordem, a faixa de
nomes, os dois grupos de adesivos e a linha do tempo se montam sozinhos a partir da lista.
Para dar vídeo a um projeto, coloque o `.webm` em `videos/` e preencha `video`.

As opções `defaultLang`, `tilt` e `ticker` ficam no início de `js/main.js`.
O idioma escolhido fica salvo no navegador.

## Publicar na Hostinger

Enviar todo o conteúdo desta pasta para a raiz de `cyberhat.com.br` (a pasta `public_html` dele),
mantendo as pastas. O `.htaccess` é um arquivo oculto: confira se ele foi junto.

---

Feito por [Vinícius Costa Magalhães](https://portfolio.cyberhat.com.br) · [Cyberhat](https://cyberhat.com.br)
