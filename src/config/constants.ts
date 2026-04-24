import type { Recipe } from '../types';

export const SECRET_PHRASE = "et in arcadia ego";

export const PRD_RECIPES: Recipe[] = [
  {
    id: 'sourdough',
    title: "Philosopher's Sourdough",
    description: 'A 72-hour fermented loaf with a crispy crust. The starter was passed down through ancient alchemical lineages.',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=1200',
    duration: '72h',
    difficulty: 'Expert',
    popularity: 98,
    category: 'Artisan Breads',
    prepTime: '45 mins',
    cookTime: '45 mins',
    servings: 1,
    ingredients: [
      "100g active mature sourdough starter (100% hydration)",
      "375g filtered water (at 78°F/25°C)",
      "500g strong bread flour (preferably stone-ground)",
      "10g fine sea salt"
    ],
    steps: [
      "In a large earthen or glass bowl, dissolve the active starter in the warm filtered water. Mix until it forms a milky liquid.",
      "Add the flour and mix by hand until a shaggy dough forms, ensuring no dry flour remains. Cover and let rest (autolyse) for 45 minutes.",
      "Sprinkle the sea salt over the dough. Using wet hands, pinch and fold the salt into the dough until fully integrated.",
      "Over the next 3 hours, perform 4 sets of stretch and folds spaced 45 minutes apart, pulling the dough upwards and folding it over itself.",
      "Cover the bowl tightly and leave it at room temperature until the dough has increased by 40-50% in volume and shows active bubbles.",
      "Turn the dough onto a lightly floured surface. Pre-shape into a loose round and let rest for 20 minutes before performing the final shaping.",
      "Place the shaped dough seam-side up in a dusted banneton. Retard in the refrigerator for 12 to 24 hours.",
      "Preheat a cast-iron Dutch oven to 500°F (260°C) for 1 hour. Turn out the dough seamlessly and score deeply.",
      "Bake covered for 20 minutes. Remove lid, drop temperature to 450°F (230°C), and bake for 25 more minutes until mahogany."
    ]
  },
  {
    id: 'galette',
    title: 'Crimson Berry Galette',
    description: 'Rustic pastry filled with seasonal berries, a hint of lavender, and a dash of cinnabar spice.',
    image: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=1200',
    duration: '2h',
    difficulty: 'Medium',
    popularity: 88,
    category: 'Confections',
    prepTime: '20 mins',
    cookTime: '35 mins',
    servings: 6,
    ingredients: [
      "1 1/4 cups all-purpose flour",
      "1/2 teaspoon kosher salt",
      "1/2 cup cold unsalted butter, cubed",
      "1/4 cup ice water",
      "3 cups mixed berries (blackberries, raspberries, blueberries)",
      "1/4 cup granulated sugar",
      "1 teaspoon fresh lavender buds",
      "1 egg (for egg wash)"
    ],
    steps: [
      "Whisk flour and salt together in a large chilled bowl.",
      "Cut in the cold butter until the mixture resembles coarse meal with pea-sized butter lumps.",
      "Drizzle ice water evenly and fold gently until the dough just comes together. Form a disc, wrap, and chill for 1 hour.",
      "In a separate bowl, toss the berries with sugar and crushed lavender buds. Allow them to macerate slightly.",
      "Roll the dough out onto parchment paper into a 12-inch rustic circle.",
      "Mound the berry mixture in the center, leaving a 2-inch border bare.",
      "Fold the border over the fruit, pleating the edges naturally as you go round.",
      "Brush the pastry border with beaten egg and sprinkle with coarse sugar.",
      "Bake at 400°F (200°C) for 35 to 40 minutes until pastry is golden and fruit is bubbling."
    ]
  },
  {
    id: 'miso',
    title: "Golden Miso Elixir",
    description: 'A deeply aromatic, life-restoring broth infused with black garlic and toasted chili oil.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1200',
    duration: '4h',
    difficulty: 'Hard',
    popularity: 94,
    category: 'Soups & Broths',
    prepTime: '30 mins',
    cookTime: '3h 30 mins',
    servings: 4,
    ingredients: [
      "2 liters high-quality vegetable or chicken stock",
      "3 tablespoons white miso paste",
      "1 tablespoon red miso paste",
      "4 cloves black garlic, mashed to a paste",
      "1 piece kombu (dried kelp)",
      "1/2 cup dried shiitake mushrooms",
      "2 inches fresh ginger, sliced thin",
      "Toasted sesame chili oil (for serving)",
      "Scallions, finely chopped"
    ],
    steps: [
      "In a heavy bottomed pot, combine the stock, kombu, dried mushrooms, and ginger.",
      "Bring the mixture to a bare simmer (do not let it boil vigorously) and hold for 2 hours to extract all umami flavors.",
      "Remove the pot from the heat. Carefully retrieve and discard the kombu and ginger. Save the hydrated mushrooms for garnish if desired.",
      "In a smaller bowl, whisk together the white miso, red miso, and black garlic paste with a ladle of the hot broth until completely smooth.",
      "Stir the miso slurry back into the main pot. From this point on, ensure the broth does not boil, as this will destroy the miso's probiotics and delicate flavor.",
      "Ladle the hot elixir into warm bowls.",
      "Garnish with thinly sliced scallions and a generous drizzle of toasted sesame chili oil."
    ]
  },
  {
    id: 'macarons',
    title: 'Midnight Blue Macarons',
    description: 'Almond shells tinted with butterfly pea flower, filled with a rich, dark chocolate ganache.',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=1200',
    duration: '1.5h',
    difficulty: 'Expert',
    popularity: 91,
    category: 'Confections',
    prepTime: '45 mins',
    cookTime: '15 mins',
    servings: 12,
    ingredients: [
      "100g egg whites (aged at room temperature)",
      "100g granulated sugar",
      "105g almond flour (fine sifted)",
      "105g powdered sugar",
      "1 tablespoon butterfly pea flower powder",
      "150g dark chocolate (70% cacao), chopped",
      "100ml heavy cream"
    ],
    steps: [
      "Sift the almond flour, powdered sugar, and butterfly pea flower powder together three times. Discard large almond pieces.",
      "Whip the egg whites on medium speed. Once frothy, slowly stream in the granulated sugar until stiff peaks form (Glossy meringue).",
      "Fold the dry ingredients into the meringue in thirds. Perform 'macaronage' by pressing the batter against the bowl to deflate slightly.",
      "Stop folding when the batter flows off the spatula in an unbroken ribbon (like lava).",
      "Pipe rounds onto a silicone mat or parchment. Tap the tray firmly to release air bubbles.",
      "Let the shells rest for 30-45 minutes until a dry skin forms.",
      "Bake at 300°F (150°C) for 14-16 minutes. Cool completely.",
      "For the ganache, heat the cream until simmering and pour over the chopped chocolate. Let sit for 2 minutes, then stir until smooth. Cool until pipeable.",
      "Pipe ganache onto half the shells and sandwich with the other half. Let mature in the fridge for 24 hours before serving."
    ]
  },
  {
    id: 'focaccia',
    title: 'Sun-Dried Tomato Focaccia',
    description: 'Soft, olive oil-rich dough dimpled with herbs and tomatoes, capturing the essence of the summer sun.',
    image: 'https://images.unsplash.com/photo-1594943714247-a859cff2e78f?auto=format&fit=crop&q=80&w=1200',
    duration: '4h',
    difficulty: 'Easy',
    popularity: 85,
    category: 'Artisan Breads',
    prepTime: '20 mins',
    cookTime: '25 mins',
    servings: 8,
    ingredients: [
      "500g strong bread flour",
      "400g warm water",
      "7g instant yeast",
      "10g fine sea salt",
      "1/4 cup extra-virgin olive oil (plus more for pan and dimpling)",
      "1/2 cup sun-dried tomatoes (oil-packed), chopped",
      "2 sprigs fresh rosemary, leaves stripped",
      "Coarse flaky sea salt"
    ],
    steps: [
      "In a large bowl, mix the flour, water, yeast, and fine salt until a sticky dough forms. No kneading required.",
      "Cover the bowl with a damp cloth and let it rise at room temperature until doubled in size, about 2 hours.",
      "Generously oil a 9x13 inch baking pan with extra-virgin olive oil.",
      "Gently scrape the dough into the prepared pan. Do not flatten it immediately. Let it rest for 20 minutes to relax the gluten.",
      "Lightly oil your fingers. Stretch the dough gently to the corners of the pan. If it resists, let it rest another 10 minutes.",
      "Cover and let the dough proof in the pan for 1 hour until puffy and jiggly.",
      "Drizzle more olive oil over the top. Press your fingers deep into the dough to create characteristic dimples.",
      "Press the chopped sun-dried tomatoes and rosemary leaves gently into the dimples. Sprinkle generously with flaky sea salt.",
      "Bake at 425°F (220°C) for 25-30 minutes until deeply golden brown and crisp on the edges."
    ]
  },
  {
    id: 'honey_cake',
    title: 'Lavender Honey Cake',
    description: 'A light, floral sponge cake sweetened with nectar harvested during the spring equinox.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200',
    duration: '1.5h',
    difficulty: 'Medium',
    popularity: 89,
    category: 'Confections',
    prepTime: '30 mins',
    cookTime: '45 mins',
    servings: 10,
    ingredients: [
      "2 1/2 cups all-purpose flour",
      "2 teaspoons baking powder",
      "1/2 teaspoon baking soda",
      "1/2 teaspoon salt",
      "1 cup unsalted butter, softened",
      "1/2 cup granulated sugar",
      "3/4 cup high-quality wildflower honey",
      "3 large eggs",
      "1/2 cup buttermilk",
      "1 tablespoon culinary lavender (steeped in 2 tbsp hot water)",
      "Vanilla bean glaze"
    ],
    steps: [
      "Preheat the oven to 350°F (175°C). Butter and flour a 9-inch bundt pan.",
      "Whisk together the flour, baking powder, baking soda, and salt in a medium bowl.",
      "In a stand mixer, cream the softened butter and sugar until light and fluffy (about 4 minutes).",
      "Gradually stream in the honey while continuing to beat on medium speed.",
      "Add the eggs one at a time, mixing well after each addition. Mix in the steeped lavender water (including buds if desired).",
      "Alternate adding the dry ingredients and buttermilk into the batter, starting and ending with the dry ingredients. Mix until just combined.",
      "Pour the batter into the prepared bundt pan and smooth the top.",
      "Bake for 40-45 minutes, or until a wooden skewer inserted comes out clean.",
      "Cool in the pan for 15 minutes before inverting onto a wire rack. Drizzle with vanilla bean glaze once cooled completely."
    ]
  },
  {
    id: 'moonstone_risotto',
    title: 'Moonstone Risotto',
    description: 'Iridescent arborio slow-cooked in white truffle stock, finished with bone marrow butter and edible silver leaf.',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=1200',
    duration: '45m',
    difficulty: 'Hard',
    popularity: 92,
    category: 'Alchemical Mains',
    prepTime: '15 mins',
    cookTime: '30 mins',
    servings: 4,
    ingredients: [
      '400g Carnaroli arborio rice',
      '1.5L white truffle stock (kept hot)',
      '120ml dry vermouth',
      '80g aged Parmigiano-Reggiano, finely grated',
      '60g bone marrow butter',
      '2 sheets edible silver leaf',
      'Black truffle shavings, to finish'
    ],
    steps: [
      'Toast the dry rice in a wide pan over high heat until the grains crackle and smell nutty.',
      'Deglaze with vermouth and stir until fully absorbed.',
      'Add the hot truffle stock one ladle at a time, stirring constantly between additions.',
      'After 18 minutes, check the grain — it should have a faint chalky centre.',
      'Remove from heat. Aggressively stir in the bone marrow butter and Parmigiano. Rest 2 minutes.',
      'Plate and apply silver leaf fragments and black truffle shavings immediately before service.'
    ]
  },
  {
    id: 'phoenix_brioche',
    title: 'Phoenix Brioche',
    description: 'An impossibly rich, flame-coloured loaf enriched with saffron-steeped butter and a touch of smoked paprika.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1200',
    duration: '5h',
    difficulty: 'Expert',
    popularity: 87,
    category: 'Artisan Breads',
    prepTime: '40 mins',
    cookTime: '30 mins',
    servings: 10,
    ingredients: [
      '500g strong white flour',
      '7g instant yeast',
      '8g fine salt',
      '50g caster sugar',
      '6 large eggs',
      '350g unsalted butter (softened), plus saffron-infused portion',
      '0.5g saffron threads, steeped in 2 tbsp warm water',
      '1 tsp smoked sweet paprika'
    ],
    steps: [
      'Mix flour, yeast, salt, and sugar. Add eggs one at a time, developing a smooth dough.',
      'Incorporate the softened butter in small pieces, kneading until completely absorbed and the dough passes the windowpane test.',
      'Fold in the saffron water and paprika until the dough is a deep amber gold.',
      'Cold-proof overnight. Divide, shape, and place into loaf tins.',
      'Proof at room temperature until doubled. Glaze with egg wash thinned with saffron water.',
      'Bake at 180°C for 28–32 minutes until a deep mahogany crust forms.'
    ]
  },
  {
    id: 'crimson_ramen',
    title: 'Crimson Alchemy Ramen',
    description: 'Twelve-hour tonkotsu broth stained blood-red with beet and chili, crowned with a perfectly calibrated soft egg.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=1200',
    duration: '14h',
    difficulty: 'Expert',
    popularity: 96,
    category: 'Alchemical Mains',
    prepTime: '45 mins',
    cookTime: '12h',
    servings: 4,
    ingredients: [
      '2kg pork trotters and neck bones',
      '200ml concentrated beet juice',
      '4 dried árbol chilies, toasted',
      '150g fresh ramen noodles per bowl',
      '4 soy-marinated eggs (62°C, 7 minutes)',
      'Chashu pork belly, braised 4 hours',
      'Burnt garlic oil, scallion, nori'
    ],
    steps: [
      'Blanch bones in boiling water for 5 minutes. Rinse and transfer to a clean stockpot.',
      'Simmer the broth at a vigorous boil for 10–12 hours, topping up as needed, until it turns opaque ivory.',
      'Strain, then reduce with beet juice and toasted chilies until the liquid is deep crimson.',
      'Season with soy, mirin, and white pepper to taste.',
      'Cook noodles separately. Assemble bowls with broth, noodles, chashu, half egg, and toppings.'
    ]
  },
  {
    id: 'tarte_tatin',
    title: 'Twilight Tarte Tatin',
    description: 'Caramelised black figs and poached quince inverted onto burnt butter pastry, glazed with violet-infused caramel.',
    image: 'https://images.unsplash.com/photo-1551024739-78b8c547d267?auto=format&fit=crop&q=80&w=1200',
    duration: '1.5h',
    difficulty: 'Medium',
    popularity: 90,
    category: 'Confections',
    prepTime: '30 mins',
    cookTime: '45 mins',
    servings: 8,
    ingredients: [
      '6 ripe black figs, halved',
      '3 quinces, peeled and poached in spiced syrup',
      '180g caster sugar',
      '90g salted butter',
      '1 tbsp violet liqueur (Crème de Violette)',
      '1 sheet all-butter puff pastry'
    ],
    steps: [
      'In a cast-iron skillet, melt butter and sugar over medium heat without stirring until it reaches a deep amber caramel.',
      'Remove from heat. Add the violet liqueur carefully — it will steam violently.',
      'Arrange figs cut-side down and quince pieces tightly in the caramel.',
      'Lay the pastry sheet over the fruit, tucking in the edges around the inside of the pan.',
      'Bake at 200°C for 30–35 minutes until the pastry is golden and cooked through.',
      'Rest for 10 minutes before inverting confidently onto a serving board.'
    ]
  },
  {
    id: 'bone_broth',
    title: "Oracle's Bone Broth",
    description: 'A deeply clarified 24-hour broth drawn from marrow bones and charred alliums, whispered to restore clarity of mind.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1200',
    duration: '24h',
    difficulty: 'Medium',
    popularity: 88,
    category: 'Soups & Broths',
    prepTime: '20 mins',
    cookTime: '22h',
    servings: 6,
    ingredients: [
      '2kg beef marrow bones, split',
      '1 head of garlic, halved crosswise and charred',
      '2 whole onions, halved and blackened in a dry pan',
      '30ml apple cider vinegar',
      '5 sprigs fresh thyme',
      '2 bay leaves',
      'Flaky salt and white pepper'
    ],
    steps: [
      'Roast the marrow bones at 220°C for 25 minutes until golden and fragrant.',
      'Transfer to a large stockpot with all remaining ingredients and enough cold water to cover by 10cm.',
      'Bring to a bare simmer. Skim the grey foam that rises for the first 30 minutes.',
      'Maintain the lowest possible simmer, uncovered, for 20–24 hours.',
      'Strain through a fine mesh, chill overnight. Lift the fat cap and discard. Season and serve.'
    ]
  },
  {
    id: 'kimchi',
    title: 'Fermented Black Garlic Kimchi',
    description: 'A slow-fermented, umami-dense kimchi amplified with black garlic paste and gochugaru from the south-facing volcanic plains.',
    image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&q=80&w=1200',
    duration: '72h',
    difficulty: 'Hard',
    popularity: 83,
    category: 'Fermented Arts',
    prepTime: '1h',
    cookTime: '72h',
    servings: 12,
    ingredients: [
      '1 head napa cabbage (about 2kg)',
      '60g coarse sea salt',
      '1 whole head black garlic, peeled and mashed to paste',
      '4 tbsp gochugaru (Korean chili flakes)',
      '2 tbsp fish sauce',
      '1 tbsp grated fresh ginger',
      '6 spring onions, sliced'
    ],
    steps: [
      'Quarter the cabbage and salt it thoroughly. Leave to wilt for 2 hours. Rinse and squeeze dry.',
      'Combine black garlic paste, gochugaru, fish sauce, and ginger into a deep crimson dressing.',
      'Toss the cabbage and spring onions through the dressing, coating every leaf.',
      'Pack tightly into sterilised glass jars, pressing down to eliminate air pockets. Seal loosely.',
      'Ferment at room temperature for 24 hours, then refrigerate for at least 48 hours before eating.'
    ]
  },
  {
    id: 'madeleines',
    title: 'Gold-Dusted Madeleines',
    description: 'Shell-shaped brown butter cakes infused with cardamom and orange blossom, finished with edible gold dust.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=1200',
    duration: '1.5h',
    difficulty: 'Medium',
    popularity: 91,
    category: 'Confections',
    prepTime: '20 mins',
    cookTime: '12 mins',
    servings: 24,
    ingredients: [
      '150g unsalted butter, browned to noisette',
      '150g plain flour',
      '150g caster sugar',
      '3 large eggs',
      '1 tsp ground cardamom',
      '1 tbsp orange blossom water',
      'Edible gold dust, for finishing'
    ],
    steps: [
      'Whisk eggs and sugar until pale and ribbon-like. Fold in flour, cardamom, and orange blossom.',
      'Stream in the warm brown butter and fold until just combined. Rest batter for 1 hour in the fridge.',
      'Butter and flour madeleine moulds. Spoon batter to three-quarters full.',
      'Bake at 200°C for 10–12 minutes until the characteristic hump rises and edges are golden.',
      'Cool for 2 minutes, unmould. Dust liberally with gold dust while still warm.'
    ]
  },
  {
    id: 'paella',
    title: 'Shadow Paella',
    description: 'Jet-black squid ink paella with clams, crisp chorizo pearls, and a smoked paprika sofrito cooked over live oak.',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=1200',
    duration: '1h',
    difficulty: 'Hard',
    popularity: 94,
    category: 'Alchemical Mains',
    prepTime: '25 mins',
    cookTime: '35 mins',
    servings: 6,
    ingredients: [
      '400g bomba paella rice',
      '1.2L rich fish stock',
      '4 sachets squid ink',
      '500g fresh clams, scrubbed',
      '200g cured chorizo, sliced into pearls',
      '1 tbsp smoked sweet paprika',
      'Saffron, aioli, and lemon to serve'
    ],
    steps: [
      'Render the chorizo pearls in a wide paellera until they release their crimson oil. Remove and reserve.',
      'Fry the sofrito (tomato, onion, garlic, paprika) in the chorizo fat until deeply caramelised.',
      'Add rice and stir for 2 minutes to coat. Pour in the hot stock mixed with squid ink — the liquid should turn absolute black.',
      'Do not stir again. Cook over high heat for 10 minutes, then lower to medium for 8 minutes.',
      'Nestle clams hinge-side down. Cover with foil and cook 5 more minutes until clams open and socarrat forms.',
      'Scatter chorizo pearls and serve with lemon wedges and cold aioli.'
    ]
  },
  {
    id: 'rye_loaf',
    title: 'Midnight Rye Loaf',
    description: 'A dense, ink-dark rye bread with caraway and molasses, cold-proved for 36 hours and baked in a covered clay pot.',
    image: 'https://images.unsplash.com/photo-1486887396153-fa416526c108?auto=format&fit=crop&q=80&w=1200',
    duration: '40h',
    difficulty: 'Expert',
    popularity: 82,
    category: 'Artisan Breads',
    prepTime: '30 mins',
    cookTime: '55 mins',
    servings: 12,
    ingredients: [
      '400g dark whole rye flour',
      '100g strong white bread flour',
      '380ml tepid water',
      '200g active rye starter (100% hydration)',
      '10g fine sea salt',
      '2 tbsp black molasses',
      '1.5 tsp caraway seeds, toasted and cracked'
    ],
    steps: [
      'Combine all ingredients and mix by hand for 5 minutes — the dough will be dense and sticky, not elastic.',
      'Transfer to a well-oiled tin, smoothing the surface. Cover and ferment at room temperature for 4 hours.',
      'Refrigerate for 32–36 hours.',
      'Remove from the fridge 2 hours before baking. Preheat oven and clay pot to 230°C.',
      'Bake covered for 30 minutes, then uncovered at 210°C for 25 more minutes.',
      'Cool completely on a rack — at least 4 hours — before slicing or the crumb will be gummy.'
    ]
  },
  {
    id: 'creme_brulee',
    title: "Philosopher's Crème Brûlée",
    description: 'A double-vanilla custard with a demerara crust torched to a perfect amber glass, served with a sprig of dried lavender.',
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&q=80&w=1200',
    duration: '3h',
    difficulty: 'Medium',
    popularity: 95,
    category: 'Confections',
    prepTime: '15 mins',
    cookTime: '40 mins',
    servings: 6,
    ingredients: [
      '600ml double cream',
      '1 vanilla pod, split and scraped',
      '1 tsp vanilla bean paste',
      '6 large egg yolks',
      '80g caster sugar',
      'Demerara sugar for the crust',
      'Dried lavender sprigs, to serve'
    ],
    steps: [
      'Heat the cream with the vanilla pod and paste until just below simmering. Infuse off the heat for 20 minutes.',
      'Whisk yolks and sugar until pale. Slowly pour in the warm cream, whisking constantly.',
      'Strain into a jug and skim any foam. Divide among six ramekins placed in a deep roasting tray.',
      'Pour boiling water into the tray to reach halfway up the ramekins. Bake at 140°C for 35–40 minutes.',
      'Chill for at least 2 hours. Just before serving, coat the surface with a thin layer of demerara and torch to a crackling amber crust.'
    ]
  },
  {
    id: 'ember_bisque',
    title: 'Ember Bisque',
    description: 'Heirloom tomatoes fire-roasted whole until blackened, then blended with brown crab and a saffron-sherry cream.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1200',
    duration: '1.5h',
    difficulty: 'Medium',
    popularity: 89,
    category: 'Soups & Broths',
    prepTime: '20 mins',
    cookTime: '50 mins',
    servings: 4,
    ingredients: [
      '1kg heirloom tomatoes (mixed varieties)',
      '200g brown crab meat',
      '120ml dry Amontillado sherry',
      '200ml double cream',
      '0.4g saffron, bloomed in 2 tbsp hot water',
      '1 tbsp tomato paste, darkened in a dry pan',
      'Chives and crème fraîche, to garnish'
    ],
    steps: [
      'Place whole tomatoes directly under a very hot grill until deeply charred and collapsed, about 20 minutes.',
      'Sweat shallots and garlic in butter. Deglaze with sherry and reduce by half.',
      'Add the charred tomatoes (skins and all), darkened tomato paste, and saffron water. Simmer 20 minutes.',
      'Blend until completely smooth and pass through a fine sieve.',
      'Stir in the cream and crab meat. Heat gently — do not boil — and season precisely.',
      'Serve with a quenelle of crème fraîche and scattered chives.'
    ]
  },
  {
    id: 'panna_cotta',
    title: 'Crystal Panna Cotta',
    description: 'A barely-set vanilla cream trembling at the edge of solidity, paired with a Champagne and elderflower gel.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=1200',
    duration: '4h',
    difficulty: 'Easy',
    popularity: 86,
    category: 'Confections',
    prepTime: '15 mins',
    cookTime: '5 mins',
    servings: 6,
    ingredients: [
      '500ml full-fat cream',
      '250ml whole milk',
      '60g caster sugar',
      '1 vanilla pod',
      '2.5 sheets platinum-grade gelatine',
      '150ml Champagne',
      '1 tbsp elderflower cordial, 0.8g agar-agar (for the gel)'
    ],
    steps: [
      'Bloom the gelatine in cold water for 5 minutes. Heat cream, milk, sugar, and vanilla to 80°C.',
      'Squeeze out and whisk in the gelatine until dissolved. Strain and divide into lightly oiled moulds.',
      'Chill for at least 3 hours until barely set — it should wobble dramatically when tapped.',
      'Warm the Champagne slightly with elderflower cordial and agar-agar. Pour into a thin tray and set in the fridge.',
      'Unmould the panna cotta by briefly dipping the mould base in warm water. Break the Champagne gel into shards and arrange alongside.'
    ]
  }
];

// Generates 3 unique numbers from 1-16. Excludes the fixed non-cipher ingredient
// quantities (written as words below) so highlights are always unambiguous. Excludes the fixed non-cipher ingredient
// quantities (written as words below) so highlights are always unambiguous.
function generateCipherSequence(): [number, number, number] {
  const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const picked: number[] = [];
  while (picked.length < 3) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked as [number, number, number];
}

// Generated once per page load — drives both ingredient highlights and hacker console sequence
export const NUMBER_SEQUENCE = generateCipherSequence();

// Non-cipher quantities are spelled as words so only the three cipher slots contain digits
export const SECRET_RECIPE: Recipe = {
  id: 'obsidian_cipher_torte',
  title: 'The Obsidian Cipher Torte',
  description:
    'A dark chocolate confection with crystalline layers. The recipe was encoded in a recursive cipher — only those who decipher the sequence may taste it.',
  image:
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200',
  duration: '4h',
  difficulty: 'Enigma',
  popularity: 1,
  category: 'Ciphered Confections',
  prepTime: '90 mins',
  cookTime: '3h',
  servings: 8,
  ingredients: [
    'Four oz bittersweet dark chocolate (70% cacao, cold-tempered)',
    `${NUMBER_SEQUENCE[0]} tsp Maldon sea salt flakes`,
    'Five tbsp espresso powder (finely ground)',
    `${NUMBER_SEQUENCE[1]} cups aged cognac (for infusion)`,
    'One large egg yolk (room temperature)',
    `${NUMBER_SEQUENCE[2]} oz black sesame paste`,
    'Two tbsp activated charcoal powder',
    'Six sheets gold leaf (24k)',
  ],
  steps: [
    'Melt the dark chocolate over a double boiler, maintaining temperature below 115°F.',
    'Whisk in the espresso powder and activated charcoal until the mixture reaches a glossy obsidian sheen.',
    'In a separate bowl, temper the egg yolk with the black sesame paste, folding in Two tbsp at a time.',
    'Gradually combine the chocolate and sesame mixtures, stirring in a clockwise direction exactly 13 times.',
    'Fold in the cognac slowly — the mixture should resist slightly before accepting it.',
    'Press the torte into a springform pan and refrigerate for Three hours.',
    'Before serving, sprinkle with Maldon salt and apply gold leaf in a non-sequential pattern.',
  ],
};
