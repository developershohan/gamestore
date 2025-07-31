(function(api) {

  api.sectionConstructor['mintraro-upsell'] = api.Section.extend({
      attachEvents: function() {},
      isContextuallyActive: function() {
          return true;
      }
  });

  const mintraro_section_lists = ['banner', 'service'];
  mintraro_section_lists.forEach(mintraro_homepage_scroll);

  function mintraro_homepage_scroll(item) {
      item = item.replace(/-/g, '_');
      wp.customize.section('mintraro_' + item + '_section', function(section) {
          section.expanded.bind(function(isExpanding) {
              wp.customize.previewer.send(item, { expanded: isExpanding });
          });
      });
  }
})(wp.customize);