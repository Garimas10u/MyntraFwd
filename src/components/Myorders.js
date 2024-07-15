import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Popper,
    TextField
} from '@mui/material';
import party from '../images/myntra/party.png'

const MyOrders = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [review, setReview] = useState('');
  const [image, setImage] = useState(null);
  const [reviews, setReviews] = useState({});
  const [reviewedProducts, setReviewedProducts] = useState([]);
  const [pointsGained, setPointsGained] = useState({});
  const [congratsOpen, setCongratsOpen] = useState(false);

  const orders = [
    {
      orderId: 'ORD123456',
      date: '2024-07-01',
      items: [
        {
          id: 'PROD1',
          name: 'Blue Denim Jeans',
          image: 'https://t3.ftcdn.net/jpg/04/83/25/50/360_F_483255019_m1r1ujM8EOkr8PamCHF85tQ0rHG3Fiqz.jpg',
          price: 1999,
          status: 'Delivered',
        },
        {
          id: 'PROD2',
          name: 'Red T-Shirt',
          image: 'https://media.istockphoto.com/id/533870481/vector/red-t-shirt-template.jpg?s=612x612&w=0&k=20&c=lhN8bM6cvhI3wsJKQuAFYb8vdfdBixDpePt-fW7QVRg=',
          price: 599,
          status: 'Delivered',
        },
      ],
    },
    {
      orderId: 'ORD789012',
      date: '2024-07-05',
      items: [
        {
          id: 'PROD3',
          name: 'White Sneakers',
          image: 'https://img.freepik.com/free-photo/new-pair-white-sneakers-isolated-white_93675-130969.jpg',
          price: 2999,
          status: 'Delivered',
        },
      ],
    },
  ];

  const handleClickOpen = (product) => {
    setSelectedProduct(product);
    const existingReview = reviews[product.id] ? reviews[product.id][0] : { text: '', image: null };
    setReview(existingReview.text);
    setImage(existingReview.image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReview('');
    setImage(null);
  };

  const handleCongratsClose = () => {
    setCongratsOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = () => {
    const newReview = { text: review, image };
    const pointsGained = image ? 10 : 5;

    setReviews((prevReviews) => ({
        ...prevReviews,
        [selectedProduct.id]: [newReview],
      }));
    setReviewedProducts((prevReviewed) => [...prevReviewed, selectedProduct.id]);
    setPointsGained((prevPointsGained) => ({
      ...prevPointsGained,
      [selectedProduct.id]: pointsGained,
    }));
    handleClose();
    setCongratsOpen(true);
  };

  return (
    <div>
      <h1 style={{color:"#FF007F", padding: '20px'}}>My Orders</h1>
      {orders.map((order) => (
        <div key={order.orderId} style={{ border: '1px solid #ccc', margin: '20px', padding: '20px' }}>
          <h2>Order ID: {order.orderId}</h2>
          <p>Date: {order.date}</p>
          <div  style={{display:'flex', gap: '10vw'}}>
            {order.items.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '10px', marginBottom:'20px' }}>
                <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', marginRight: '20px' }} />
                <div>
                  <div  style={{display: 'flex', gap: '5vw'}}>
                  <h3>{item.name}</h3>
                  <p style={{paddingTop: '6px', fontSize: '18px'}}>
                    {reviewedProducts.includes(item.id) && (
                      <span style={{ color: '#008080', fontWeight:'600' }}>Gained Points: {pointsGained[item.id]}</span>
                    )}
                  </p>
                  </div>
                  
                  <p>Price: ₹{item.price}</p>
                  <p>Status: {item.status}</p>
                  {reviews[item.id] && reviews[item.id].map((review, index) => (
                    <div key={index} style={{ marginTop: '10px', padding: '20px', border: '1px solid #ddd'}}>
                      <div><h5>Review:</h5></div> {review.text}
                      {review.image &&  <div ><img src={review.image} alt="Review" style={{ width: '100px', height: '100px', marginTop: '10px' }} /></div>}
                    </div>
                  ))}
                  
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#FF007F', color: 'white', marginTop: '10px' }}
                    onClick={() => handleClickOpen(item)} 
                  >
                    {reviewedProducts.includes(item.id) ? "Edit Review" : "Write a Review"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{reviewedProducts.includes(selectedProduct?.id) ? "Edit Review" : "Write a Review"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please write a review for {selectedProduct?.name}.
              </DialogContentText>
              <TextField autoFocus margin="dense" label="Review" type="text"
                fullWidth variant="outlined" value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleImageChange}
              />
              <div>
              {image && <img src={image} alt="Review" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
              </div>
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span" style={{ marginTop: '10px', backgroundColor: '#FF007F', color: 'white' }}>
                  Upload Image
                </Button>
              </label>
              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">Cancel</Button>
              <Button onClick={handleSubmitReview} color="primary">Submit</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={congratsOpen} onClose={handleCongratsClose}>
            <DialogTitle style={{color:'#008080'}}>Congratulations!</DialogTitle>
            <DialogContent>
              <DialogContentText style={{color: '#000000'}}>
              <div style={{display:'flex', justifyContent:'center', marginBottom: '5px'}}> <img src={party} alt="" width="50" /></div>
               
                You have gained {pointsGained[selectedProduct?.id]} points for your review!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCongratsClose} style={{color:'#008080'}}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;

