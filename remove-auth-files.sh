#!/bin/bash

# Script to remove all auth-related files

# Remove auth directory and all its contents
rm -rf app/auth

# Remove supabase.ts file if it exists
rm -f lib/supabase.ts

echo "All auth-related files have been removed." 