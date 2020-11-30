import './admin-main.html';
import '/imports/ui/layouts/layout';

Router.route('/location');
Router.route('/add');
Router.route('/addNewEntry');
Router.route('/locationList');
Router.route('/speciesList');
Router.route('/species');

Router.route('/', {
    name: 'home',
    template: 'home'
  });

Router.configure({ 
  layoutTemplate: 'main'
})