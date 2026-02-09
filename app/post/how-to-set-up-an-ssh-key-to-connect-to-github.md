---
title: "🔐 How to Set Up an SSH Key to Connect to GitHub"
slug: "how-to-set-up-an-ssh-key-to-connect-to-github"
date: "2026-02-09"
excerpt: "Using SSH keys allows you to securely connect to GitHub without entering your username and password every time you interact with a repository."
---

#

Using SSH keys allows you to securely connect to GitHub without entering your username and password every time you interact with a repository.

---

## ✅ Prerequisites

- Git installed
- A GitHub account
- Terminal access
  - macOS / Linux: Terminal
  - Windows: Git Bash

Check Git installation:

```bash
git --version
```

---

## 1️⃣ Check for Existing SSH Keys

Before creating a new key, check if one already exists:

```bash
ls -al ~/.ssh
```

If you see files like `id_ed25519` and `id_ed25519.pub` (or `id_rsa` and `id_rsa.pub`), you already have an SSH key.

---

## 2️⃣ Generate a New SSH Key

Generate a new SSH key using the recommended **ed25519** algorithm:

```bash
ssh-keygen -t ed25519 -C "dbt19@example.com"
```

If `ed25519` is not supported, use RSA instead:

```bash
ssh-keygen -t rsa -b 4096 -C "dbt19@example.com"
```

When prompted:

- Press **Enter** to accept the default file location
- Optionally enter a passphrase for added security

---

## 3️⃣ Start the SSH Agent and Add the Key

Start the SSH agent:

```bash
eval "$(ssh-agent -s)"
```

Add your SSH private key:

```bash
ssh-add ~/.ssh/id_ed25519
```

(Use `id_rsa` if you generated an RSA key.)

---

## 4️⃣ Add the SSH Key to GitHub

### Copy the public key

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy the entire output.

### Add the key to GitHub

1. Go to **GitHub → Settings**
2. Select **SSH and GPG keys**
3. Click **New SSH key**
4. Paste your public key
5. Give it a recognizable title (e.g. _Dbt19's Laptop_)
6. Click **Add SSH key**

---

## 5️⃣ Test the SSH Connection

Test your connection to GitHub:

```bash
ssh -T git@github.com
```

If successful, you will see:

```text
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

---

## 6️⃣ Use SSH with GitHub Repositories

Make sure your repository remote URL uses SSH, not HTTPS.

Example SSH URL:

```text
git@github.com:username/repository-name.git
```

Clone a repository using SSH:

```bash
git clone git@github.com:username/repository-name.git
```

---

## 🛠 Troubleshooting

**Permission denied (publickey)?**

- Ensure your SSH key is added to GitHub
- Make sure the SSH agent is running
- Verify the repository URL uses SSH

Check which key is being used:

```bash
ssh -vT git@github.com
```

---

## 📚 Useful Commands

```bash
ssh-add -l      # List SSH keys added to the agent
ssh-add -D      # Remove all keys from the agent
```

---

## ✅ Done

Your SSH key is now set up and connected to GitHub 🎉
