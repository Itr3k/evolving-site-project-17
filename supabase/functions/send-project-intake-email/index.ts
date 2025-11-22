import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ProjectIntakeRequest {
  companyName: string;
  contactName: string;
  contactRole: string;
  contactEmail: string;
  industry: string;
  companySize: string;
  revenueBand?: string;
  locationsServed: string;
  explorationPrompt: string;
  topThreeOutcomes: string;
  futureSuccess: string;
  constraints?: string;
  operationalFriction: string;
  repetitiveTasks: string;
  errorProne: string;
  busyProcesses: string;
  costImpact: string;
  departmentsInScope: string[];
  departmentDetails: string;
  criticalWorkflows?: string;
  coreSystems: string;
  dataLocations: string;
  dataQuality: string;
  systemIntegrations: string;
  systemsToAvoid?: string;
  currentAITools?: string;
  whatWorkedWell?: string;
  whatDidntWork?: string;
  teamComfort: string;
  discoveryParticipants: string;
  budgetApprovers: string;
  skepticalStakeholders?: string;
  decisionProcess: string;
  complianceFrameworks?: string[];
  sensitiveData?: string;
  negativeExperiences?: string;
  offLimitsAreas?: string;
  preferredTimeline: string;
  communicationCadence: string;
  additionalInfo?: string;
}

const formatOptional = (value: string | string[] | undefined, defaultText = "None specified") => {
  if (!value) return defaultText;
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : defaultText;
  }
  return value.trim() || defaultText;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ProjectIntakeRequest = await req.json();
    console.log("Received project intake submission from:", data.contactEmail);

    // Validate required fields
    if (!data.companyName || !data.contactName || !data.contactEmail) {
      throw new Error("Missing required fields");
    }

    const timestamp = new Date().toLocaleString('en-US', { 
      timeZone: 'America/Los_Angeles',
      dateStyle: 'full',
      timeStyle: 'long'
    });

    // Email to Korra with detailed submission
    const emailToKorra = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Elevated AI <onboarding@resend.dev>",
        to: ["korra@elevatedai.co"],
        subject: `🚨 New AI Audit Request - ${data.companyName}`,
        html: `
        <div style="font-family: 'Courier New', monospace; line-height: 1.6; color: #333;">
          <h1 style="color: #0038FF; border-bottom: 3px solid #0038FF; padding-bottom: 10px;">
            NEW AI AUDIT INTAKE SUBMISSION
          </h1>
          <p style="background: #f0f0f0; padding: 10px; border-radius: 5px;">
            <strong>Submitted:</strong> ${timestamp}<br>
            <strong>Contact:</strong> ${data.contactName} (${data.contactEmail})<br>
            <strong>Company:</strong> ${data.companyName}
          </p>

          <h2 style="color: #0038FF; margin-top: 30px; border-bottom: 2px solid #e0e0e0;">📊 COMPANY BASICS</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong>Company:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${data.companyName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong>Contact:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${data.contactName}, ${data.contactRole} - ${data.contactEmail}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong>Industry:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${data.industry}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong>Size:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${data.companySize}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong>Revenue:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${formatOptional(data.revenueBand, "Not disclosed")}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong>Locations:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${data.locationsServed}</td></tr>
          </table>

          <h2 style="color: #0038FF; margin-top: 30px; border-bottom: 2px solid #e0e0e0;">🎯 GOALS & SUCCESS CRITERIA</h2>
          <p><strong>Exploration Prompt:</strong><br>${data.explorationPrompt}</p>
          <p><strong>Top 3 Outcomes:</strong><br>${data.topThreeOutcomes}</p>
          <p><strong>Future Success Vision:</strong><br>${data.futureSuccess}</p>
          <p><strong>Constraints:</strong><br>${formatOptional(data.constraints)}</p>

          <h2 style="color: #0038FF; margin-top: 30px; border-bottom: 2px solid #e0e0e0;">⚠️ CURRENT STATE & PAIN POINTS</h2>
          <p><strong>Operational Friction:</strong><br>${data.operationalFriction}</p>
          <p><strong>Repetitive Tasks:</strong><br>${data.repetitiveTasks}</p>
          <p><strong>Error-Prone Areas:</strong><br>${data.errorProne}</p>
          <p><strong>Processes That Fall Behind:</strong><br>${data.busyProcesses}</p>
          <p><strong>Cost/Revenue Impact:</strong><br>${data.costImpact}</p>

          <h2 style="color: #0038FF; margin-top: 30px; border-bottom: 2px solid #e0e0e0;">🏢 DEPARTMENTS & WORKFLOWS</h2>
          <p><strong>Departments in Scope:</strong><br>${formatOptional(data.departmentsInScope)}</p>
          <p><strong>Department Details:</strong><br>${data.departmentDetails}</p>
          <p><strong>Critical Workflows:</strong><br>${formatOptional(data.criticalWorkflows)}</p>

          <h2 style="color: #0038FF; margin-top: 30px; border-bottom: 2px solid #e0e0e0;">💾 SYSTEMS & DATA</h2>
          <p><strong>Core Systems:</strong><br>${data.coreSystems}</p>
          <p><strong>Data Locations:</strong><br>${data.dataLocations}</p>
          <p><strong>Data Quality:</strong> ${data.dataQuality}</p>
          <p><strong>System Integrations:</strong><br>${data.systemIntegrations}</p>
          <p><strong>Systems to Avoid:</strong><br>${formatOptional(data.systemsToAvoid)}</p>

          <h2 style="color: #0038FF; margin-top: 30px; border-bottom: 2px solid #e0e0e0;">🤖 AI & AUTOMATION MATURITY</h2>
          <p><strong>Current AI Tools:</strong><br>${formatOptional(data.currentAITools, "None currently")}</p>
          <p><strong>What Worked Well:</strong><br>${formatOptional(data.whatWorkedWell, "N/A")}</p>
          <p><strong>What Didn't Work:</strong><br>${formatOptional(data.whatDidntWork, "N/A")}</p>
          <p><strong>Team Comfort Level:</strong> ${data.teamComfort}</p>

          <h2 style="color: #0038FF; margin-top: 30px; border-bottom: 2px solid #e0e0e0;">👥 STAKEHOLDERS & DECISION-MAKING</h2>
          <p><strong>Discovery Participants:</strong><br>${data.discoveryParticipants}</p>
          <p><strong>Budget Approvers:</strong><br>${data.budgetApprovers}</p>
          <p><strong>Skeptical Stakeholders:</strong><br>${formatOptional(data.skepticalStakeholders, "None identified")}</p>
          <p><strong>Decision Process:</strong><br>${data.decisionProcess}</p>

          <h2 style="color: #0038FF; margin-top: 30px; border-bottom: 2px solid #e0e0e0;">🔒 CONSTRAINTS, RISKS, AND BOUNDARIES</h2>
          <p><strong>Regulatory Frameworks:</strong><br>${formatOptional(data.complianceFrameworks, "None")}</p>
          <p><strong>Sensitive Data:</strong><br>${formatOptional(data.sensitiveData)}</p>
          <p><strong>Negative Past Experiences:</strong><br>${formatOptional(data.negativeExperiences)}</p>
          <p><strong>Off-Limits Areas:</strong><br>${formatOptional(data.offLimitsAreas)}</p>

          <h2 style="color: #0038FF; margin-top: 30px; border-bottom: 2px solid #e0e0e0;">📅 PRACTICAL DETAILS</h2>
          <p><strong>Preferred Timeline:</strong> ${data.preferredTimeline}</p>
          <p><strong>Communication Cadence:</strong> ${data.communicationCadence}</p>
          <p><strong>Additional Information:</strong><br>${formatOptional(data.additionalInfo)}</p>

          <div style="background: #0038FF; color: white; padding: 20px; margin-top: 30px; border-radius: 8px;">
            <h2 style="margin: 0 0 15px 0;">📧 NEXT STEPS</h2>
            <ol style="margin: 0; padding-left: 20px;">
              <li>Review submission within 24 hours</li>
              <li>Schedule discovery call with ${data.contactName}</li>
              <li>Prepare initial assessment based on responses</li>
            </ol>
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            This intake was submitted via elevatedai.co/solutions<br>
            ${timestamp}
          </p>
        </div>
      `,
      }),
    });

    console.log("Email sent to Korra, status:", emailToKorra.status);

    // Confirmation email to client
    const firstName = data.contactName.split(' ')[0];
    const confirmationEmail = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Korra at Elevated AI <onboarding@resend.dev>",
        to: [data.contactEmail],
        subject: "We received your AI Audit request - Elevated AI",
        html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0038FF 0%, #0028CC 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Thank You, ${firstName}!</h1>
          </div>

          <div style="padding: 30px; background: #ffffff;">
            <p style="font-size: 16px;">Hi ${firstName},</p>

            <p style="font-size: 16px;">
              Thank you for taking the time to complete our comprehensive AI Audit questionnaire!
            </p>

            <p style="font-size: 16px;">
              Your submission has been received and I'll personally review it within the next 24 hours. 
              This detailed information will help me prepare a much more targeted and valuable discovery conversation with you.
            </p>

            <div style="background: #f8f9fa; border-left: 4px solid #0038FF; padding: 20px; margin: 25px 0;">
              <h2 style="margin: 0 0 15px 0; color: #0038FF; font-size: 18px;">📊 What Happens Next:</h2>
              <ol style="margin: 0; padding-left: 20px; font-size: 15px;">
                <li style="margin-bottom: 8px;">I'll review your responses and research your industry context</li>
                <li style="margin-bottom: 8px;">I'll reach out within 24 hours to schedule a discovery call</li>
                <li style="margin-bottom: 8px;">We'll discuss your specific challenges and potential solutions</li>
                <li style="margin-bottom: 8px;">You'll receive a preliminary assessment and next steps</li>
              </ol>
            </div>

            <div style="background: #fff7ed; border-left: 4px solid #f59e0b; padding: 20px; margin: 25px 0;">
              <h2 style="margin: 0 0 15px 0; color: #f59e0b; font-size: 18px;">🎯 In Our Call, We'll Cover:</h2>
              <ul style="margin: 0; padding-left: 20px; font-size: 15px;">
                <li style="margin-bottom: 8px;">High-impact automation opportunities based on your responses</li>
                <li style="margin-bottom: 8px;">Realistic timelines and investment ranges</li>
                <li style="margin-bottom: 8px;">Case studies relevant to your industry and challenges</li>
                <li style="margin-bottom: 8px;">Proof-of-concept approach to validate solutions</li>
              </ul>
            </div>

            <div style="background: #f0f9ff; border: 2px solid #0038FF; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center;">
              <p style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">💡 In the meantime, explore:</p>
              <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <a href="https://elevatedai.co/showcase" style="background: #0038FF; color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; display: inline-block; font-weight: 600;">Case Studies</a>
                <a href="https://elevatedai.co/resources" style="background: #0038FF; color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; display: inline-block; font-weight: 600;">AI Resources</a>
                <a href="https://elevatedai.co/contact" style="background: #0038FF; color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; display: inline-block; font-weight: 600;">Schedule Call</a>
              </div>
            </div>

            <p style="font-size: 16px; margin-top: 30px;">
              Looking forward to exploring how AI can transform your operations.
            </p>

            <p style="font-size: 16px; margin-top: 25px;">
              Best regards,<br>
              <strong>Korra</strong><br>
              <span style="color: #666;">Founder, Elevated AI</span>
            </p>

            <div style="border-top: 2px solid #e5e7eb; margin-top: 30px; padding-top: 20px; text-align: center; color: #666; font-size: 14px;">
              <p style="margin: 5px 0;">Los Angeles, California</p>
              <p style="margin: 5px 0;">
                <a href="mailto:korra@elevatedai.co" style="color: #0038FF;">korra@elevatedai.co</a> | 
                <a href="tel:+14244843844" style="color: #0038FF;">1-424-484-3844</a>
              </p>
            </div>
          </div>
        </div>
      `,
      }),
    });

    console.log("Confirmation email sent to client, status:", confirmationEmail.status);

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-project-intake-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
