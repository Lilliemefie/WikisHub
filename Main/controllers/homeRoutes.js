const router = require('express').Router();
//Wiki and User is from the file in Models folder > wait for Tom
const { Wiki, User } = require('../modles');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        //Get all wikis and JOIN with user data
        const wikiData = await Wiki.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        // Serialize data so the template can read it
        const wikis = wikiData.map((wiki) => wiki.get({plain: true}));
        // Pass serialized data and session flag into template
        res.render('hompage', {
            wikis,
            logged_in: req.session.logged_in
        });
    }catch (err){
        res.status(500).json(err);
    }
});

router.get('/wiki/:id', async (req, res) => {
    try {
        const wikiData = await Wiki.findByPk(req.params.id, {
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        });

        const wikis = wikiData.get({ plain: true });
    
        res.render('wiki', {
          ...wikis,
          logged_in: req.session.logged_in
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

// Use withAuth middleware to prevent access to route
router.get('/wiki', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Project }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile'); //do we have 'profile' ??
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;
  