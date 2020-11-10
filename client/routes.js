import './main.html';
import './add.html';

Router.route('/stats');
Router.route('/species');
Router.route('/location');
Router.route('/mineral');
Router.route('/rock');
Router.route('/add');
Router.route('/addNewEntry');

Router.route('/', {
    name: 'home',
    template: 'home'
  });

Router.configure({
  layoutTemplate: 'main'
})