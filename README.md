Tech : ReactJS, JavaScript, HTML5, JSX, SVG,

componentDidMount:
Props were passed to this component from his parent. Among this props are height and width of a container element that adjusts to the screen and video size. Some elements are positioned based on this measures.  SVG images get attached to html5 elements

shouldComponentUpdate:
Props are constantly changing so in the shouldComponentUpdate life cycle this props are evaluated to assess the need of re-rendering the component.

componentDidUpdate:
On this cycle a function is called to remove the last svg images attached to the elements, so that new svg images can be attached.
