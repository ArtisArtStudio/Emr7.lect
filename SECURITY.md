# Güvenlik ve API anahtarları

## Anahtarları GitHub'a koymayın

Bu depo ve GitHub Pages sitesi herkese açıktır. Groq veya ElevenLabs anahtarını `index.html`, JavaScript dosyaları, commit, issue, pull request, Actions değişkeni veya Pages yapılandırmasına yazmayın. Statik web uygulamasında ön yüze verilen herhangi bir sır kullanıcılar tarafından görülebilir.

Her kullanıcı kendi anahtarını uygulamanın ayarlarına girer. “Bu cihazda hatırla” seçilirse anahtar yalnızca o tarayıcının `localStorage` alanına yazılır; GitHub'a gönderilmez. Bu depolama şifrelenmez ve aynı kökendeki istemci kodu ile tarayıcıyı inceleyebilen kişiler anahtarı okuyabilir. Paylaşılan cihazlarda anahtarı kaydetmeyin. Gerektiğinde ayarlardaki **Anahtarı sil** seçeneğini kullanın.

Uygulama API çağrılarını tarayıcıdan doğrudan ilgili sağlayıcıya yapar. Sağlayıcıya gönderdiğiniz istek/metinler ve kullanım hesabınızın koşullarına tabidir. Uygulama sahibi tarafından yönetilen ortak bir anahtar gerekiyorsa, istemciden ayrı, kimlik doğrulama ve kullanım sınırları olan bir backend tasarlayın; anahtarı yalnızca backend'in gizli yapılandırmasında tutun.

## Anahtar sızarsa

1. Anahtarı ilgili sağlayıcı hesabından iptal edip yenisini üretin.
2. Anahtarın Git geçmişine girdiyse yalnızca dosyadan silmek yeterli değildir; geçmişten kaldırın ve anahtarı yine de sızmış kabul edin.
3. Herhangi bir anahtarı bu depoya eklemeyin. `.gitignore` yerel sır dosyalarını dışarıda tutar; `scripts/check-secrets.py` bilinen anahtar biçimlerini CI'da tarar.
