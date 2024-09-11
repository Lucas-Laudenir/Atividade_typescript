import express, { Request, Response } from 'express';


const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// Rota para listar Pokémon
app.get('/', async (req: Request, res: Response) => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  
    const data = await response.json();
    res.render('index', { pokemons: data.results });
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/stats/:name', async (req: Request, res: Response) => {
  const name = req.params.name;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from API`);
    }
    const pokemonData = await response.json();
    res.render('stats', { name: pokemonData.name, stats: pokemonData.stats,Image: pokemonData.sprites.front_default 
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
