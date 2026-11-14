# Rohit Durbha Portfolio

This is my personal portfolio site. It is a plain static site with no build step, so GitHub Pages can serve the files exactly as they are.

## Files

| File | What it holds |
| --- | --- |
| `content.js` | Every word, number and link shown on the site |
| `resume.pdf` | The resume that the two resume links open |
| `index.html` | The page shell and all of the styling |
| `app.js` | The code that draws the page and the animated figures |
| `fonts/` | Geist Serif and Geist Pixel, both under the SIL Open Font License |

## Editing the content

1. Open `content.js` on GitHub and press the pencil icon to edit it.
2. Change the text between the quotation marks and leave the field names alone.
3. Press the green commit button, and the live site refreshes about a minute later.

To add a project, copy one block inside `entries`, paste it below the others and change its fields. The `kind` field takes either `research` or `build`, and the entry numbers on the page update on their own. The `link` field is optional, so delete it when a repository is private.

Each block picks its animated figure and its color by name. The available figure and color names are listed in the comment that opens `content.js`.

## Replacing the resume

1. Rename the new resume on your computer to `resume.pdf`.
2. On the repository page choose Add file, then Upload files, and drop the PDF in.
3. Commit the upload, and GitHub replaces the old file because the names match.

There is no upload control on the site itself, so visitors only ever see the finished link.

## Previewing on your own computer

Run the command below inside this folder and open the address that it prints.

```bash
python3 -m http.server 8000
```
