R = React.DOM

Quiz = React.createClass
  render: ->
    R.h1 null, "Hello World!"

React.renderComponent(Quiz(), document.getElementById("draft1"))