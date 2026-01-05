# i18nkit Demo

Démonstration i18n Angular avec [i18nkit](https://www.npmjs.com/package/@abdess76/i18nkit).

## Démarrage rapide

```bash
git clone https://github.com/Abdess/i18nkit-demo.git
cd i18nkit-demo
npm install
npm start
```

Ouvrir <http://localhost:4200>. L'application s'affiche en français. Le sélecteur de langue est présent, mais inactif.

```bash
npm run i18n
```

Rafraîchir la page. Le multilingue fonctionne.

## Stack

- Angular 21
- PrimeNG 21
- Tailwind CSS 4
- Transloco 8.2

## Workflow détaillé

### Vue d'ensemble

Workflow classique i18n :

```
Code → Identifier textes → Créer clés → Modifier templates → Créer JSON → Traduire → Vérifier
```

Avec i18nkit :

```
Code → npm run i18n → Terminé
```

### Étape 1 : Code source

Textes en dur :

```html
<p-card header="Formulaire">
  <input pInputText placeholder="Nom" />
  <p-button label="Envoyer" />
</p-card>

<p-card header="Statuts">
  <p-tag value="Disponible" severity="success" />
  <p-tag value="En cours" severity="warn" />
</p-card>
```

### Étape 2 : Extraction

```bash
npm run extract
```

Résultat :

```
Files scanned:     5
Strings found:     8

By context:
  titles: 2
  placeholders: 1
  buttons: 1
  labels: 2
```

Aucune modification. Rapport uniquement.

### Étape 3 : Transformation

```bash
npm run extract:apply
```

Avant :

```html
<p-card header="Formulaire">
```

Après :

```html
<p-card [header]="'demo.titles.formulaire' | transloco">
```

L'import `TranslocoPipe` est ajouté automatiquement.

### Étape 4 : Traduction

```bash
npm run translate
```

Résultat dans `en.json` :

```json
{
  "demo": {
    "titles": {
      "formulaire": "Form",
      "statuts": "Statuses"
    },
    "buttons": {
      "envoyer": "Send"
    },
    "labels": {
      "disponible": "Available",
      "en_cours": "In progress"
    }
  }
}
```

### Étape 5 : Validation

```bash
npm run build
npm start
```

## Intégration

### Installation

```bash
npm install @abdess76/i18nkit --save-dev
```

### Scripts

```json
{
  "scripts": {
    "extract": "i18nkit",
    "extract:apply": "i18nkit --lang fr --auto-apply",
    "translate": "i18nkit --translate fr:en",
    "i18n": "i18nkit --lang fr --auto-apply && i18nkit --translate fr:en"
  }
}
```

### Prérequis Transloco

```bash
ng add @jsverse/transloco
```

## Transformations supportées

| Source | Attribut | Contexte |
|--------|----------|----------|
| `h1` à `h6` | contenu | titles |
| `p`, `span`, `div` | contenu | text |
| `button`, `p-button` | label | buttons |
| `label` | contenu | labels |
| `input` | placeholder | placeholders |
| `p-card`, `p-dialog` | header | titles |
| `p-message` | text | messages |
| `p-tag` | value | labels |
| tout élément | pTooltip | tooltips |

### Structure des clés

`{composant}.{contexte}.{slug}`

Exemple : `demo.buttons.envoyer`

## Commandes

| Commande | Description |
|----------|-------------|
| `i18nkit` | Extraction (rapport) |
| `i18nkit --lang fr --auto-apply` | Extraction + transformation |
| `i18nkit --translate fr:en` | Traduction |
| `i18nkit --watch` | Mode watch |
| `i18nkit --check-sync` | Vérification sync |
| `i18nkit --dry-run` | Prévisualisation |

## Traduction

```bash
# MyMemory (défaut, sans clé)
i18nkit --translate fr:en

# MyMemory avec rate limit plus élevé
i18nkit --translate fr:en --email you@example.com

# DeepL (qualité pro)
DEEPL_API_KEY=xxx i18nkit --translate fr:en --deepl
```

## CI/CD

```yaml
# .github/workflows/i18n.yml
- run: npm run i18n:ci
```

```json
{
  "scripts": {
    "i18n:ci": "i18nkit --check-sync --strict && i18nkit --find-orphans --strict"
  }
}
```

Échoue si traductions manquantes ou clés orphelines.

## Bonnes pratiques

### Workflow équipe

1. Développer avec textes FR
2. `npm run extract:apply` avant commit
3. Réviser les traductions
4. Ajuster si nécessaire

### Textes ignorés

- Textes avec `| transloco`
- Expressions `{{ variable }}`
- Attributs dynamiques `[attr]="value"`

## Dépannage

**Aucun texte détecté**
Vérifier que les textes sont des chaînes statiques.

**Traduction incorrecte**
Modifier le texte FR pour lever l'ambiguïté, relancer la traduction.

**Import manquant**
Vérifier que le composant est dans `src/app/`.

## Ressources

- [i18nkit](https://www.npmjs.com/package/@abdess76/i18nkit)
- [Transloco](https://jsverse.github.io/transloco/)
- [PrimeNG](https://primeng.org/)
