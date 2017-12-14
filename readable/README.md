Installation and Launch the app
-----------------------------------
* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window
    - `cd readable`
    - `npm install`
    - `npm start`


Features Summary:
----------------------------------
Listed posts are displayed with title, author, number of comments, current score, and a voting mechanism to upvote or downvote the post. Posts should have buttons or links for editing or deleting that post.

The voting mechanism works and correctly displays the new vote score after clicking. 

List posts link to the detail page for that post. 

All posts are listed at the root.

All posts for a category are listed at /:category 

List pages (root or category) include a mechanism for sorting by date or by score (at a minimum) and the sort works properly. 

List pages include a button to add a new post. 

All available categories are visible in any list view.

Post detail is available at /:category/:post_id 

Post is displayed with title, body, author, number of comments, current score and voting mechanism. Post should have buttons or links for editing or deleting that post. 

Listed comments are displayed with author, current score, and a voting mechanism to upvote or downvote the comment. Comments should have buttons or links for editing or deleting that comment. 

The voting mechanism works and correctly displays the new vote score after clicking for both the post and comments.

All comments for a post are displayed below the post body. 

A mechanism for adding a new comment is visible on the detail page and functional. 
