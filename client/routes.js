import './main.html';
import '/imports/ui/layouts/layout';

Router.route('/stats');
Router.route('/species');
Router.route('/location');
Router.route('/mineral');
Router.route('/rock');
Router.route('/add');
Router.route('/addNewEntry');
Router.route('/locationList');

Router.route('/', {
    name: 'home',
    template: 'home'
  });

Router.configure({ 
  layoutTemplate: 'main'
})