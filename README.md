# Muhammad Areeb Khan — Portfolio

Professional static portfolio prepared for GitHub + Vercel deployment.

## Contact shown on website
- Email: areebnadeem222@gmail.com
- Phone: +92 330 2961481
- LinkedIn: https://www.linkedin.com/in/muhammad-areeb-khan-b52266240

## Recommended deployment — GitHub → Vercel
1. Create a new GitHub repository and upload all files from this folder.
2. In Vercel choose **Add New → Project → Import Git Repository** and select that repository.
3. Deploy. `vercel.json` and `package.json` are already configured.
4. In Vercel Project Settings → Environment Variables, enable **Automatically expose System Environment Variables** if it is not already enabled.
5. Redeploy once after enabling it.

The build reads Vercel's repository variables and automatically sets the portfolio's **GitHub** button to the exact GitHub repository used for deployment. The **Live Portfolio** button automatically points to the production Vercel URL.

After GitHub is connected to the Vercel project, future pushes to the production branch trigger new Vercel deployments automatically.

## Local preview
Open `index.html` directly, or run any simple static server. GitHub auto-linking is only generated during a Git/Vercel build; locally the GitHub button falls back to github.com.
