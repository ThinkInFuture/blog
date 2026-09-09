(function(){
if(window.__hsShareLoaded)return;
window.__hsShareLoaded=true;
var css='.hs-share-btn{position:fixed;right:24px;bottom:24px;width:44px;height:44px;border-radius:50%;background:#fff;border:1px solid #e5e5e5;box-shadow:0 2px 12px rgba(0,0,0,.08);cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:9999;transition:all .2s;padding:0}.hs-share-btn:hover{border-color:#3b82f6;box-shadow:0 4px 16px rgba(59,130,246,.2)}.hs-share-btn svg{width:20px;height:20px;fill:#666;pointer-events:none}.hs-share-btn:hover svg{fill:#3b82f6}.hs-share-panel{position:fixed;right:24px;bottom:78px;background:#fff;border:1px solid #e5e5e5;border-radius:10px;box-shadow:0 4px 24px rgba(0,0,0,.12);padding:6px;display:none;flex-direction:column;z-index:9999;min-width:148px}.hs-share-panel.open{display:flex}.hs-share-item{display:flex;align-items:center;gap:10px;padding:10px 14px;font-size:14px;color:#333;border:none;background:none;border-radius:6px;cursor:pointer;font-family:inherit;text-align:left;white-space:nowrap;width:100%}.hs-share-item:hover{background:#f4f5f7}.hs-share-item svg{width:16px;height:16px;fill:#666;flex-shrink:0}.hs-share-mask{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.45);display:none;align-items:center;justify-content:center;z-index:10000}.hs-share-mask.open{display:flex}.hs-share-qr{background:#fff;border-radius:12px;padding:28px 32px;text-align:center;max-width:82vw}.hs-share-qr-title{font-size:15px;font-weight:600;color:#111;margin-bottom:4px;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.hs-share-qr-desc{font-size:12px;color:#999;margin-bottom:16px;font-family:inherit}#hs-share-qrcode img,#hs-share-qrcode canvas,#hs-share-qrcode table{margin:0 auto}.hs-share-toast{position:fixed;bottom:84px;right:24px;background:rgba(17,17,17,.85);color:#fff;font-size:13px;padding:8px 16px;border-radius:6px;z-index:10001;opacity:0;transition:opacity .25s;pointer-events:none;font-family:inherit}.hs-share-toast.show{opacity:1}';
var style=document.createElement('style');
style.textContent=css;
document.head.appendChild(style);
var btn=document.createElement('button');
btn.className='hs-share-btn';
btn.setAttribute('aria-label','分享本页');
btn.innerHTML='<svg viewBox="0 0 24 24"><path d="M18 16.1c-.8 0-1.5.3-2 .8l-7.1-4.2c0-.2.1-.5.1-.7s0-.5-.1-.7L16 7.2c.5.5 1.2.8 2 .8 1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3c0 .2 0 .5.1.7L8 9.8C7.5 9.3 6.8 9 6 9c-1.7 0-3 1.3-3 3s1.3 3 3 3c.8 0 1.5-.3 2-.8l7.1 4.2c0 .2-.1.4-.1.6 0 1.6 1.3 2.9 2.9 2.9s2.9-1.3 2.9-2.9-1.2-2.9-2.8-2.9z"/></svg>';
var panel=document.createElement('div');
panel.className='hs-share-panel';
var copyItem=document.createElement('button');
copyItem.className='hs-share-item';
copyItem.innerHTML='<svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg><span>复制链接</span>';
var wxItem=document.createElement('button');
wxItem.className='hs-share-item';
wxItem.innerHTML='<svg viewBox="0 0 24 24"><path d="M8.7 3C4.9 3 1.8 5.6 1.8 8.9c0 1.9 1 3.5 2.7 4.7l-.7 2.1 2.4-1.2c.6.2 1.3.4 2 .4h.4c-.1-.4-.2-.9-.2-1.3 0-3.1 3-5.6 6.6-5.6h.4C14.8 5.3 12 3 8.7 3zM6.4 7.3c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm4.8 0c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zM22.2 13.6c0-2.8-2.8-5.1-5.9-5.1s-5.9 2.3-5.9 5.1 2.6 5.1 5.9 5.1c.6 0 1.2-.1 1.8-.3l2.1 1-.6-1.8c1.6-1 2.6-2.5 2.6-4zm-7.9-.9c-.4 0-.8-.3-.8-.8s.4-.8.8-.8.8.3.8.8-.4.8-.8.8zm4 0c-.4 0-.8-.3-.8-.8s.4-.8.8-.8.8.3.8.8-.4.8-.8.8z"/></svg><span>微信扫码</span>';
panel.appendChild(copyItem);
panel.appendChild(wxItem);
var mask=document.createElement('div');
mask.className='hs-share-mask';
mask.innerHTML='<div class="hs-share-qr"><div class="hs-share-qr-title"></div><div class="hs-share-qr-desc">微信扫一扫，手机阅读</div><div id="hs-share-qrcode"></div></div>';
var toast=document.createElement('div');
toast.className='hs-share-toast';
toast.textContent='链接已复制';
document.body.appendChild(btn);
document.body.appendChild(panel);
document.body.appendChild(mask);
document.body.appendChild(toast);
function togglePanel(){panel.classList.toggle('open')}
btn.addEventListener('click',function(e){e.stopPropagation();togglePanel()});
document.addEventListener('click',function(e){
if(!panel.contains(e.target)&&e.target!==btn&&!btn.contains(e.target))panel.classList.remove('open');
});
function showToast(){
toast.classList.add('show');
setTimeout(function(){toast.classList.remove('show')},1800);
}
copyItem.addEventListener('click',function(){
var url=location.href;
panel.classList.remove('open');
if(navigator.clipboard&&navigator.clipboard.writeText){
navigator.clipboard.writeText(url).then(showToast);
}else{
var t=document.createElement('textarea');
t.value=url;
t.style.position='fixed';
t.style.opacity='0';
document.body.appendChild(t);
t.select();
try{document.execCommand('copy');showToast()}catch(e){}
document.body.removeChild(t);
}
});
var qrMade=false;
wxItem.addEventListener('click',function(){
panel.classList.remove('open');
mask.querySelector('.hs-share-qr-title').textContent=document.title;
mask.classList.add('open');
if(!qrMade&&typeof QRCode!=='undefined'){
new QRCode(document.getElementById('hs-share-qrcode'),{text:location.href,width:180,height:180,correctLevel:QRCode.CorrectLevel.M});
qrMade=true;
}
});
mask.addEventListener('click',function(e){
if(e.target===mask)mask.classList.remove('open');
});
document.addEventListener('keydown',function(e){
if(e.key==='Escape'){mask.classList.remove('open');panel.classList.remove('open')}
});
})();
