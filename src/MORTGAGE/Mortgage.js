import { useMemo, useState } from "react";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [propertyTax, setPropertyTax] = useState("");
  const [homeInsurance, setHomeInsurance] = useState("");
  const [hoa, setHoa] = useState("");

  const breakdown = useMemo(() => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment) || 0;
    const annualRate = parseFloat(interestRate);
    const years = parseInt(loanTerm, 10);
    const annualTax = parseFloat(propertyTax) || 0;
    const annualInsurance = parseFloat(homeInsurance) || 0;
    const monthlyHoa = parseFloat(hoa) || 0;

    if (
      Number.isNaN(price) ||
      Number.isNaN(annualRate) ||
      Number.isNaN(years) ||
      price <= 0 ||
      years <= 0 ||
      down < 0 ||
      down > price ||
      annualRate < 0
    ) {
      return null;
    }

    const loanAmount = price - down;
    const monthlyRate = annualRate / 100 / 12;
    const totalPayments = years * 12;

    let monthlyPrincipalAndInterest = 0;

    if (monthlyRate === 0) {
      monthlyPrincipalAndInterest = loanAmount / totalPayments;
    } else {
      monthlyPrincipalAndInterest =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    }

    const monthlyTax = annualTax / 12;
    const monthlyInsuranceAmount = annualInsurance / 12;
    const totalMonthlyPayment =
      monthlyPrincipalAndInterest +
      monthlyTax +
      monthlyInsuranceAmount +
      monthlyHoa;

    const totalMortgagePayment = monthlyPrincipalAndInterest * totalPayments;
    const totalInterest = totalMortgagePayment - loanAmount;

    return {
      loanAmount,
      monthlyPrincipalAndInterest,
      monthlyTax,
      monthlyInsuranceAmount,
      monthlyHoa,
      totalMonthlyPayment,
      totalMortgagePayment,
      totalInterest,
      totalPayments,
    };
  }, [
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    propertyTax,
    homeInsurance,
    hoa,
  ]);

  function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Mortgage Calculator</h1>
        <p style={styles.subtitle}>
          See the full monthly and lifetime breakdown.
        </p>

        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Home Price</label>
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Down Payment</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Interest Rate (%)</label>
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Loan Term (Years)</label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Annual Property Tax</label>
            <input
              type="number"
              value={propertyTax}
              onChange={(e) => setPropertyTax(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Annual Home Insurance</label>
            <input
              type="number"
              value={homeInsurance}
              onChange={(e) => setHomeInsurance(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Monthly HOA</label>
            <input
              type="number"
              value={hoa}
              onChange={(e) => setHoa(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        {!breakdown && (
          <p style={styles.message}>
            Enter valid values to see the payment breakdown.
          </p>
        )}

        {breakdown && (
          <>
            <div style={styles.summaryBox}>
              <div style={styles.summaryLabel}>Estimated Monthly Payment</div>
              <div style={styles.summaryValue}>
                {formatCurrency(breakdown.totalMonthlyPayment)}
              </div>
            </div>

            <div style={styles.breakdownGrid}>
              <div style={styles.breakdownCard}>
                <span style={styles.breakdownTitle}>Loan Amount</span>
                <strong>{formatCurrency(breakdown.loanAmount)}</strong>
              </div>

              <div style={styles.breakdownCard}>
                <span style={styles.breakdownTitle}>Principal + Interest</span>
                <strong>
                  {formatCurrency(breakdown.monthlyPrincipalAndInterest)}
                </strong>
              </div>

              <div style={styles.breakdownCard}>
                <span style={styles.breakdownTitle}>Property Tax / Month</span>
                <strong>{formatCurrency(breakdown.monthlyTax)}</strong>
              </div>

              <div style={styles.breakdownCard}>
                <span style={styles.breakdownTitle}>Insurance / Month</span>
                <strong>
                  {formatCurrency(breakdown.monthlyInsuranceAmount)}
                </strong>
              </div>

              <div style={styles.breakdownCard}>
                <span style={styles.breakdownTitle}>HOA / Month</span>
                <strong>{formatCurrency(breakdown.monthlyHoa)}</strong>
              </div>

              <div style={styles.breakdownCard}>
                <span style={styles.breakdownTitle}>Total Interest</span>
                <strong>{formatCurrency(breakdown.totalInterest)}</strong>
              </div>

              <div style={styles.breakdownCard}>
                <span style={styles.breakdownTitle}>Total Mortgage Paid</span>
                <strong>
                  {formatCurrency(breakdown.totalMortgagePayment)}
                </strong>
              </div>

              <div style={styles.breakdownCard}>
                <span style={styles.breakdownTitle}>Number of Payments</span>
                <strong>{breakdown.totalPayments}</strong>
              </div>
            </div>

            <div style={styles.table}>
              <div style={styles.rowHeader}>
                <span>Monthly Cost Breakdown</span>
                <span>Amount</span>
              </div>

              <div style={styles.row}>
                <span>Principal + Interest</span>
                <span>
                  {formatCurrency(breakdown.monthlyPrincipalAndInterest)}
                </span>
              </div>

              <div style={styles.row}>
                <span>Property Tax</span>
                <span>{formatCurrency(breakdown.monthlyTax)}</span>
              </div>

              <div style={styles.row}>
                <span>Home Insurance</span>
                <span>{formatCurrency(breakdown.monthlyInsuranceAmount)}</span>
              </div>

              <div style={styles.row}>
                <span>HOA</span>
                <span>{formatCurrency(breakdown.monthlyHoa)}</span>
              </div>

              <div style={{ ...styles.row, ...styles.totalRow }}>
                <span>Total Monthly Payment</span>
                <span>{formatCurrency(breakdown.totalMonthlyPayment)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "32px 16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "900px",
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)",
  },
  title: {
    margin: 0,
    fontSize: "32px",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: "8px",
    marginBottom: "24px",
    color: "#475569",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#1e293b",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    boxSizing: "border-box",
    fontSize: "15px",
  },
  message: {
    marginTop: "12px",
    color: "#b91c1c",
    fontWeight: "500",
  },
  summaryBox: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "20px",
  },
  summaryLabel: {
    color: "#1d4ed8",
    fontSize: "14px",
    marginBottom: "8px",
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: "34px",
    fontWeight: "700",
    color: "#0f172a",
  },
  breakdownGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
    marginBottom: "24px",
  },
  breakdownCard: {
    padding: "16px",
    borderRadius: "12px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  breakdownTitle: {
    fontSize: "13px",
    color: "#64748b",
  },
  table: {
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    overflow: "hidden",
  },
  rowHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 16px",
    background: "#0f172a",
    color: "#fff",
    fontWeight: "700",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 16px",
    borderTop: "1px solid #e2e8f0",
    background: "#fff",
  },
  totalRow: {
    background: "#f8fafc",
    fontWeight: "700",
  },
};
