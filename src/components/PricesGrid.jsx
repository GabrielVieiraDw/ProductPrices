import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";

export default function PricesGrid({ prices }) {
  const groupedPrices = prices.reduce((acc, price) => {
    if (!acc[price.product_name]) acc[price.product_name] = [];
    acc[price.product_name].push(price);
    return acc;
  }, {});

  return (
    <Box mt={2}>
      <Typography variant="h6">Prices</Typography>
      <List>
        {Object.entries(groupedPrices).map(([product, records]) => (
          <Paper elevation={3} sx={{ marginBottom: 2, padding: 2 }} key={product}>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>{product}</Typography>
            <List disablePadding>
              {records.map((record, index) => (
                <div key={`${product}-${record.product_id}-${index}`}>
                  <ListItem>
                    <ListItemText
                      primary={`${record.shop_name}: $${record.price}`}
                      secondary={
                        <a href={record.url} target="_blank" rel="noopener noreferrer">
                          View Product
                        </a>
                      }
                    />
                  </ListItem>
                  {index < records.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          </Paper>
        ))}
      </List>
    </Box>
  );
}