## What the List Component Does?

-   List is a React functional component that renders a list of selectable items. It takes one prop called items, which is an array of objects. Each object in the items array must have a text property that represents the text to be displayed for the item.

-   The List component maps over the items array and renders a SingleListItem component for each item. The SingleListItem component takes several props, such as isSelected, text, and onClickHandler.

-   The List component uses the useState hook to keep track of the selectedIndex, which represents the index of the currently selected item in the list. The useEffect hook is used to reset the selectedIndex state whenever the items prop changes.

-   The List component is memoized using React's memo higher-order component, which ensures that the component is only re-rendered when its props have changed.

## What Problems/Warning are there with code?

-   `List.jsx:53` Uncaught TypeError: PropTypes.shapeOf is not a function
    -   There is no function named `shapeOf` in PropTypes Module
-   `List.jsx:52` Invariant Violation: Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them.
-   `List.jsx:38` Warning: Each child in a list should have a unique "key" prop. Check the render method of `WrappedListComponent`
    -   Whenever we iterate through an array with map we need to pass a key prop to each item in order to let the react know which item is removed or added or else every item will be re-rendered
-   Warning: Failed prop type: Invalid prop `isSelected` of type `function` supplied to `WrappedSingleListItem`, expected `boolean`.
-   Uncaught TypeError: setSelectedIndex is not a function
    -   useState returns an array where the first item is value and the other one is a function using which we have to update the associated value
    -   But, in the code the array items are reversed
-   `List.jsx:34` Warning: Cannot update a component (`WrappedListComponent`) while rendering a different component (`WrappedSingleListItem`). To locate the bad setState() call inside `WrappedSingleListItem`.
    -   In case we are calling a function with argument on onClick Event then we have to wrap the calling function insider another function or else it will be called whenever the component renderes where the function lies.
-   `List.jsx:39` Uncaught TypeError: Cannot read properties of null (reading 'map')
    -   Add Optional Chaining in case whenever their is not surity that the data will be available


## Optimized Code

    import { useState, useEffect, memo } from "react";
    import PropTypes from "prop-types";

    // Single List Item
    const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
        return (
            <li
                style={{ backgroundColor: isSelected ? "green" : "red" }}
                <!-- Calling ClickHandler inside arrow function wont let the function get called unless clicked -->
                onClick={() => onClickHandler(index)}
            >
                {text}
            </li>
        );
    };

    WrappedSingleListItem.propTypes = {
        index: PropTypes.number,
        isSelected: PropTypes.bool,
        onClickHandler: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired,
    };

    const SingleListItem = memo(WrappedSingleListItem);

    // List Component
    const WrappedListComponent = ({ items }) => {
        <!-- Changed the order of state, and state update function -->
        const [selectedIndex, setSelectedIndex] = useState();

        useEffect(() => {
            setSelectedIndex(null);
        }, [items]);

        const handleClick = (index) => {
            setSelectedIndex(index);
        };

        return (
            <ul style={{ textAlign: "left" }}>
                {items?.map((item, index) => (
                    <SingleListItem
                        key={index}
                        onClickHandler={() => handleClick(index)}
                        text={item.text}
                        index={index}
                        <!-- selectedIndex === index => Returns an boolean -->
                        isSelected={selectedIndex === index}
                    />
                ))}
            </ul>
        );
    };

    WrappedListComponent.propTypes = {
        <!-- PropTypes.arrayOf => as this is an array of objects -->
        items: PropTypes.arrayOf(
            <!-- shapeOf is invalid function -->
            PropTypes.shape({
                text: PropTypes.string.isRequired,
            })
        ),
    };

    WrappedListComponent.defaultProps = {
        items: null,
    };

    const List = memo(WrappedListComponent);

    export default List;
