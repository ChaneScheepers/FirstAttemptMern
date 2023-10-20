// const Router = require("./routes/index");

// //tests if the fav feature is working correctly. 
// test("calls send on request with no fav message", () => {
//   mockFn = jest.fn();

//   const res = {
//     send: mockFn
//   };
 
//   getFavouritesHandler(null, res);

//   expect(mockFn.mock.calls).toHaveLength(1);  
//   expect(mockFn.mock.calls[0][0]).toEqual({
//     message: "You have no favourites to display",
//   });
// });

// test("calls send with fav if they exist", () => {
//     setFavourites(["hallo", "baai"]);

//     mockFn = jest.fn();
  
//     const res = {
//       send: mockFn
//     };
   
//     getFavouritesHandler(null, res);
  
//     expect(mockFn.mock.calls).toHaveLength(1);  
//     expect(mockFn.mock.calls[0][0]).toEqual({
//       favourites: ["hallo", "baai"],
//     });
//   });
