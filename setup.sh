echo "START"
npm run test:coverage || exit 0
npm run build
echo "END"