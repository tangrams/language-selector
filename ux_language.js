// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
L.UxLanguage = L.Control.extend({
    options: {
        languages: {
            // Language selector
            '(default)': false,
            'Arabic - العربية': 'ar',
            'Chinese - 中文': 'zh',
            'German - Deutsch': 'de',
            'English': 'en',
            'Spanish - Español': 'es',
            'French - Français': 'fr',
            'Greek - ελληνικά': 'gr',
            'Japanese - 日本語': 'ja',
            'Korean - 한국어': 'ko',
            'Russian - Русский': 'ru'
        },
        global: 'ux_language',
        position: 'topleft',
        icon: 'https://tangrams.github.io/ux_language/ux_language_01.png',
        scene: null
    },

    initialize: function(options) {
        L.Util.setOptions(this, options);
    },

    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom ux_language-container');
        var image =  L.DomUtil.create('img', 'ux_language-icon', container);
        image.src = this.options.icon;

        var selector = L.DomUtil.create('SELECT', 'ux_language-selector', container);
        selector.style.backgroundColor = "rgba(0, 0, 0, 0)"

        for (var key in this.options.languages) {
            var language = L.DomUtil.create('option', 'ux_language-option');
            if (!this.options.languages[key]) {
                language.text = '';
            }
            else {
                language.text = this.options.languages[key] + ' - ' + key;
            }
            language.value = this.options.languages[key];
            selector.add(language);
        }
        var options = this.options;
        selector.selectedIndex = 0;

        selector.onchange = function(onchange){
            console.log('Changing language to:', onchange.target.value);

            options.scene.load( {
              import: [ L.Mapzen.BasemapStyles.TronMoreLabels ],
              global: {
                ux_language: onchange.target.value
              }
            });
            options.scene.updateConfig();

            if (onchange.target.value == 'false') {
                selector.style.backgroundColor = "rgba(0, 0, 0, 0)"
                image.style.visibility = 'visible';
            } else {
                selector.style.backgroundColor = '#FFF';
                image.style.visibility = 'hidden';
            }
        }

        return container;
    }
});

L.uxLanguage = function(options) { return new L.UxLanguage(options); };